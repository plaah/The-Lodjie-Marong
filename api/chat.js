import { buildSystemPrompt } from '../src/data/system-prompt.js'
import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const kb = JSON.parse(readFileSync(join(__dirname, '../src/data/knowledge-base.json'), 'utf-8'))

const rateLimitMap = new Map()

const RATE_LIMIT_MAX = 10
const RATE_LIMIT_WINDOW_MS = 60_000
const CLEANUP_INTERVAL_MS = 5 * 60_000

function checkRateLimit(key) {
  const now = Date.now()
  const entry = rateLimitMap.get(key)

  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS })
    return true
  }

  entry.count += 1
  if (entry.count > RATE_LIMIT_MAX) {
    return false
  }

  return true
}

function scheduleCleanup() {
  setTimeout(() => {
    const now = Date.now()
    for (const [key, entry] of rateLimitMap) {
      if (now > entry.resetTime) {
        rateLimitMap.delete(key)
      }
    }
    scheduleCleanup()
  }, CLEANUP_INTERVAL_MS)
}

scheduleCleanup()

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
    return res.status(200).end()
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  if (!process.env.NVIDIA_API_KEY) {
    return res.status(500).json({ error: 'Chat service unavailable. Please try again later.' })
  }

  const { messages, sessionId } = req.body || {}

  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Invalid request.' })
  }

  const rateLimitKey = sessionId || req.headers['x-forwarded-for'] || req.socket.remoteAddress || 'unknown'
  if (!checkRateLimit(rateLimitKey)) {
    return res.status(429).json({ error: 'Rate limit exceeded. Please wait before sending another message.' })
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
  })

  if (!nvidiaResponse.ok) {
    return res.status(502).json({ error: 'Connection to AI service failed. Please try again or contact us via WhatsApp.' })
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
