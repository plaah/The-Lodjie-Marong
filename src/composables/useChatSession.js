import { ref, computed, watch, onScopeDispose } from 'vue'

const SESSION_TTL = 3600000
const MAX_MESSAGES = 20
const STORAGE_KEYS = {
  sessionId: 'lodjie-chat-session-id',
  history: 'lodjie-chat-history',
  lastActive: 'lodjie-chat-last-active',
}
const COOKIE_NAME = 'lodjie_session'

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function setCookie(name, value, maxAge) {
  document.cookie = `${name}=${value};max-age=${maxAge};path=/;SameSite=Lax`
}

function readStorage(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw !== null ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

let sharedState = null
let listenerCount = 0
let globalCleanupFn = null

function addListenerIfNeeded() {
  if (listenerCount === 0 && typeof window !== 'undefined') {
    window.addEventListener('storage', handleStorageEvent)
    globalCleanupFn = () => window.removeEventListener('storage', handleStorageEvent)
  }
  listenerCount++
}

function removeListenerIfNeeded() {
  listenerCount--
  if (listenerCount === 0 && globalCleanupFn) {
    globalCleanupFn()
    globalCleanupFn = null
  }
}

function handleStorageEvent(e) {
  if (!sharedState) return
  const { messages, sessionId, lastActive } = sharedState
  if (e.key === STORAGE_KEYS.history && e.newValue !== null) {
    try {
      messages.value = JSON.parse(e.newValue)
    } catch {}
  }
  if (e.key === STORAGE_KEYS.sessionId && e.newValue !== null) {
    sessionId.value = e.newValue
  }
  if (e.key === STORAGE_KEYS.lastActive && e.newValue !== null) {
    lastActive.value = JSON.parse(e.newValue)
  }
}

export function useChatSession() {
  if (sharedState) {
    return sharedState
  }

  const lastActive = ref(
    readStorage(STORAGE_KEYS.lastActive, 0)
  )
  const expired = Date.now() - lastActive.value > SESSION_TTL

  if (expired) {
    localStorage.removeItem(STORAGE_KEYS.sessionId)
    localStorage.removeItem(STORAGE_KEYS.history)
    localStorage.removeItem(STORAGE_KEYS.lastActive)
    lastActive.value = 0
  }

  const sessionId = ref(
    readStorage(STORAGE_KEYS.sessionId, null) || generateUUID()
  )
  const messages = ref(
    readStorage(STORAGE_KEYS.history, [])
  )

  if (!readStorage(STORAGE_KEYS.sessionId, null)) {
    writeStorage(STORAGE_KEYS.sessionId, sessionId.value)
  }

  function touch() {
    const ts = Date.now()
    lastActive.value = ts
    writeStorage(STORAGE_KEYS.lastActive, ts)
    if (typeof window !== 'undefined') {
      setCookie(COOKIE_NAME, sessionId.value, SESSION_TTL / 1000)
    }
  }

  function sendMessage(role, content) {
    messages.value = [...messages.value, { id: generateId(), role, content, timestamp: Date.now() }]
    if (messages.value.length > MAX_MESSAGES) {
      messages.value = messages.value.slice(-MAX_MESSAGES)
    }
    touch()
  }

  function clearSession() {
    sessionId.value = generateUUID()
    messages.value = []
    lastActive.value = Date.now()
    touch()
  }

  const isSessionValid = computed(() => {
    return Date.now() - lastActive.value <= SESSION_TTL
  })

  watch(
    messages,
    (val) => {
      writeStorage(STORAGE_KEYS.history, val)
    },
    { deep: true }
  )

  addListenerIfNeeded()
  onScopeDispose(removeListenerIfNeeded)

  touch()

  sharedState = {
    sessionId,
    messages,
    sendMessage,
    clearSession,
    isSessionValid,
    touch,
  }

  return sharedState
}
