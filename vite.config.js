import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vercel from 'vite-plugin-vercel'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    command === 'build' ? vercel() : null,
    {
      name: 'api-dev-handler',
      configureServer(server) {
        let kb
        try {
          kb = JSON.parse(readFileSync(join(__dirname, 'src/data/knowledge-base.json'), 'utf-8'))
        } catch {
          kb = { venue: {}, packages: [], facilities: [], faq: [], contact: {} }
        }

        let apiKey = process.env.NVIDIA_API_KEY
        if (!apiKey) {
          try {
            const envContent = readFileSync(join(__dirname, '.env.local'), 'utf-8')
            const match = envContent.match(/NVIDIA_API_KEY=(.+)/)
            if (match) apiKey = match[1].trim()
          } catch {}
        }

        server.middlewares.use(async (req, res, next) => {
          if (req.url !== '/api/chat') return next()

          // Handle OPTIONS preflight
          if (req.method === 'OPTIONS') {
            res.writeHead(200, {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Methods': 'POST, OPTIONS',
              'Access-Control-Allow-Headers': 'Content-Type',
            })
            return res.end()
          }

          if (req.method !== 'POST') {
            res.writeHead(405, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify({ error: 'Method not allowed.' }))
          }

          // Collect body
          let body = ''
          req.on('data', chunk => { body += chunk })
          req.on('end', async () => {
            try {
              const { messages } = JSON.parse(body || '{}')
              if (!Array.isArray(messages) || messages.length === 0) {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'Invalid request.' }))
              }

              // Import system prompt builder
              const { buildSystemPrompt, detectLanguage } = await import(join(__dirname, 'src/data/system-prompt.js'))
              const lang = detectLanguage(messages[0]?.content || '')
              const systemPrompt = buildSystemPrompt(kb, lang)

              const validMessages = []
              for (const m of messages.map((m, i) =>
                i === 0
                  ? { role: 'user', content: systemPrompt + '\n\n---\n\n' + m.content }
                  : m
              )) {
                if (!m.content) continue
                if (validMessages.length > 0 && validMessages[validMessages.length - 1].role === m.role) continue
                validMessages.push(m)
              }

              if (validMessages.length === 0 || validMessages[validMessages.length - 1].role !== 'user') {
                res.writeHead(400, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'Invalid message sequence.' }))
              }

              if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'Chat service unavailable. Please try again later.' }))
              }

              const nvidiaResponse = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${apiKey}`,
                },
                body: JSON.stringify({
                  model: 'google/gemma-2-2b-it',
                  messages: validMessages,
                  temperature: 0.2,
                  top_p: 0.7,
                  max_tokens: 1024,
                  stream: true,
                }),
                signal: AbortSignal.timeout(30000),
              })

              if (!nvidiaResponse.ok) {
                const errBody = await nvidiaResponse.text()
                console.error('NVIDIA API error:', nvidiaResponse.status, errBody.substring(0, 200))
                res.writeHead(502, { 'Content-Type': 'application/json' })
                return res.end(JSON.stringify({ error: 'Connection to AI service failed.' }))
              }

              res.setHeader('Access-Control-Allow-Origin', '*')
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
                    if (raw === '[DONE]') {
                      res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
                      break
                    }
                    try {
                      const data = JSON.parse(raw)
                      const content = data.choices?.[0]?.delta?.content
                      if (content) res.write(`data: ${JSON.stringify({ content })}\n\n`)
                      if (data.choices?.[0]?.finish_reason === 'stop') {
                        res.write(`data: ${JSON.stringify({ done: true })}\n\n`)
                      }
                    } catch {}
                  }
                }
              } catch {}
              res.end()
            } catch (err) {
              console.error('API error:', err)
              if (!res.headersSent) {
                res.writeHead(500, { 'Content-Type': 'application/json' })
                res.end(JSON.stringify({ error: 'Internal server error' }))
              }
            }
          })
        })
      }
    }
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': '/src'
    }
  }
}))
