import { buildSystemPrompt } from '../src/data/system-prompt.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const kb = JSON.parse(readFileSync(join(__dirname, '../src/data/knowledge-base.json'), 'utf-8'))

function sendJson(res, statusCode, body) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json' })
  res.end(JSON.stringify(body))
}

// TODO: Add proper rate limiting with Vercel KV or Upstash Redis
// In-memory rate limiting doesn't work in stateless serverless functions.
// Each invocation runs in an isolated container with fresh state.

function parseSSELine(raw, res) {
  if (raw === '[DONE]') {
    res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
    return true
  }

  try {
    const data = JSON.parse(raw)
    const content = data.choices?.[0]?.delta?.content
    if (content) {
      res.write(`data: ${JSON.stringify({ content })}\n\n`)
    }
    if (data.choices?.[0]?.finish_reason === 'stop') {
      res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
    }
  } catch {
    // skip malformed SSE lines
  }
  return false
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    return res.end()
  }

  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: 'Method not allowed.' })
  }

  if (!process.env.NVIDIA_API_KEY) {
    return sendJson(res, 500, { error: 'Chat service unavailable. Please try again later.' })
  }

  const { messages } = req.body || {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return sendJson(res, 400, { error: 'Invalid request.' })
  }

  if (messages.length > 20) {
    return sendJson(res, 400, { error: 'Message history too long. Please start a new conversation.' })
  }

  const systemPrompt = buildSystemPrompt(kb)

  const nvidiaResponse = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NVIDIA_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'google/gemma-2-2b-it',
      messages: [{ role: 'system', content: systemPrompt }, ...messages],
      temperature: 0.2,
      top_p: 0.7,
      max_tokens: 1024,
      stream: true,
    }),
    signal: AbortSignal.timeout(8000),
  })

  if (!nvidiaResponse.ok) {
    return sendJson(res, 502, { error: 'Connection to AI service failed. Please try again or contact us via WhatsApp.' })
  }

  res.setHeader('Content-Type', 'text/event-stream')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('Connection', 'keep-alive')
  res.flushHeaders()

  const reader = nvidiaResponse.body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop()

      for (const line of lines) {
        const trimmed = line.trim()
        if (!trimmed.startsWith('data: ')) continue

        const raw = trimmed.slice(6)
        if (parseSSELine(raw, res)) break
      }
    }

    if (buffer.trim().startsWith('data: ')) {
      const raw = buffer.trim().slice(6)
      parseSSELine(raw, res)
    }
  } catch {
    // stream error — client likely disconnected
  }

  res.end()
}
