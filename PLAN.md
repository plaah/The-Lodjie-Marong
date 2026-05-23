# AI Chatbot Implementation Plan

## Overview
Floating AI chatbot widget powered by NVIDIA Gemma 2-2B, proxied through Vercel Serverless Functions. Answers venue questions, gives price ranges, redirects to WhatsApp for booking. Session cached 1 hour via localStorage + cookies.

## Architecture
```
Browser (ChatWidget.vue)
  ├── POST /api/chat (streaming SSE) → api/chat.js → NVIDIA API
  └── useChatSession.js → sessionId, chatHistory[], 1hr TTL
```

---

## Tasks

### Task 1: Knowledge Base + System Prompt
- Create `src/data/knowledge-base.json` with venue info, packages, facilities, FAQ
- Create `src/data/system-prompt.js` that builds system prompt from KB

### Task 2: Vercel Serverless API Route
- Create `api/chat.js` — proxy to NVIDIA API with streaming SSE
- Add rate limiting (10 req/min per session)
- Add error handling (graceful fallback)

### Task 3: Session Management Composable
- Create `src/composables/useChatSession.js`
- UUID v4 sessionId, localStorage chatHistory
- 1-hour TTL with auto-expire
- Cookie fallback for cross-tab sync
- Max 20 messages per session

### Task 4: Chat Widget Component
- Create `src/components/ChatWidget.vue`
- Floating button: fixed bottom-right, circular, heritage green, pulse animation
- Chat panel: desktop 380px slide-up, mobile full-screen overlay
- Messages: user (right, deep forest), bot (left, cream)
- Streaming UI: typing indicator, real-time chunk append
- Welcome message on first open
- Heritage luxury design matching site theme

### Task 5: i18n Translations
- Add `chat.*` keys to `src/locales/id.json`
- Add `chat.*` keys to `src/locales/en.json`

### Task 6: Integration
- Mount `<ChatWidget />` in `src/App.vue`
- Add `.env.local` with `NVIDIA_API_KEY`
- Verify `.gitignore` excludes `.env.local`

### Task 7: Test & Verify
- Build passes (`npm run build`)
- Streaming works locally (`npm run dev`)
- Session persists across refresh (1hr TTL)
- Mobile responsive check
- Error handling verified

---

## Execution Order
1 → 2 → 3 → 4 → 5 → 6 → 7

## Success Criteria
1. Floating chat button visible on all pages
2. Chat opens/closes smoothly
3. Bot responds in correct language (ID/EN)
4. Answers reference venue info accurately
5. Gives price ranges, redirects booking to WhatsApp
6. Session persists across page refreshes (1hr TTL)
7. Mobile responsive
8. No API key exposed in browser
9. Build passes cleanly
