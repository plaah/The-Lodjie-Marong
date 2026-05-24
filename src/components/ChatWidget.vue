<template>
  <div>
    <!-- Floating Button -->
    <button
      v-if="!isOpen"
      ref="triggerButton"
      @click="openChat"
      aria-label="Chat dengan kami"
      role="button"
      :aria-expanded="isOpen"
      class="fixed bottom-4 right-4 z-[9999] w-14 h-14 rounded-full bg-deep-forest text-white shadow-lg hover:scale-105 active:scale-95 transition-transform flex items-center justify-center"
    >
      <span class="absolute inset-0 rounded-full bg-deep-forest animate-pulse-ring"></span>
      <svg class="w-6 h-6 relative z-10" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 14.58 3 12.84 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
      </svg>
    </button>

    <!-- Chat Panel Overlay (Mobile) -->
    <div
      v-if="isOpen"
      class="fixed inset-0 z-[9998] bg-black/50 sm:hidden"
      @click="isOpen = false"
    ></div>

    <!-- Chat Panel -->
    <div
      v-show="isOpen"
      role="dialog"
      aria-modal="true"
      aria-label="Lodjie Assistant"
      :class="[
        'fixed z-[9999] flex flex-col bg-cream shadow-2xl transition-all',
        'sm:bottom-4 sm:right-4 sm:w-[380px] sm:h-[500px] sm:rounded-2xl',
        'inset-0 sm:inset-auto'
      ]"
    >
      <!-- Header -->
      <div class="flex items-center justify-between px-4 py-3 border-b border-deep-forest/10 bg-deep-forest text-cream rounded-t-2xl">
        <h3 class="font-headline text-lg">{{ locale.t.chat?.title || 'Lodjie Assistant' }}</h3>
        <button
          @click="closeChat"
          aria-label="Tutup chat"
          class="p-1 hover:bg-deep-forest/20 rounded-full transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Messages -->
      <div ref="messageContainer" class="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        <!-- Welcome Message -->
        <div v-if="messages.length === 0 && !isStreaming" class="flex justify-start">
          <div class="max-w-[85%] px-4 py-3 bg-cream border border-deep-forest/10 text-deep-forest rounded-2xl rounded-bl-sm">
            <p class="text-sm">{{ locale.t.chat?.welcome || 'Welcome to The Lodjie Marong! How can we help you?' }}</p>
            <p class="text-xs text-on-surface-variant/60 mt-1">{{ formatTime(Date.now()) }}</p>
          </div>
        </div>

        <!-- Message List -->
        <div v-for="msg in messages" :key="msg.id" :class="['flex', msg.role === 'user' ? 'justify-end' : 'justify-start']">
          <div
            :class="[
              'max-w-[85%] px-4 py-3 rounded-2xl',
              msg.role === 'user'
                ? 'bg-deep-forest text-cream rounded-br-sm'
                : 'bg-cream border border-deep-forest/10 text-deep-forest rounded-bl-sm'
            ]"
          >
            <p class="text-sm whitespace-pre-wrap">{{ msg.content }}</p>
            <p :class="['text-xs mt-1', msg.role === 'user' ? 'text-cream/60' : 'text-on-surface-variant/60']">
              {{ formatTime(msg.timestamp) }}
            </p>
          </div>
        </div>

        <!-- Typing Indicator -->
        <div v-if="isStreaming" class="flex justify-start">
          <div class="px-4 py-3 bg-cream border border-deep-forest/10 rounded-2xl rounded-bl-sm">
            <div class="flex gap-1">
              <span class="w-2 h-2 bg-deep-forest/40 rounded-full animate-bounce-dot"></span>
              <span class="w-2 h-2 bg-deep-forest/40 rounded-full animate-bounce-dot" style="animation-delay: 0.15s"></span>
              <span class="w-2 h-2 bg-deep-forest/40 rounded-full animate-bounce-dot" style="animation-delay: 0.3s"></span>
            </div>
          </div>
        </div>

        <!-- Error Message -->
        <div v-if="errorMessage" class="flex justify-start">
          <div class="px-4 py-3 bg-red-50 border border-red-200 text-red-700 rounded-2xl rounded-bl-sm">
            <p class="text-sm">{{ errorMessage }}</p>
          </div>
        </div>
      </div>

      <!-- Input Area -->
      <div class="px-4 py-3 border-t border-deep-forest/10 flex gap-2">
        <input
          ref="inputField"
          v-model="inputValue"
          @keydown.enter.prevent="handleSend"
          aria-label="Ketik pesan"
          :placeholder="locale.t.chat?.placeholder || 'Type your message...'"
          class="flex-1 px-3 py-2 text-sm bg-cream border border-deep-forest/20 rounded-full focus:outline-none focus:border-deep-forest/50 text-deep-forest placeholder:text-on-surface-variant/40"
          :disabled="isStreaming"
        />
        <button
          @click="handleSend"
          :disabled="!inputValue.trim() || isStreaming"
          aria-label="Kirim pesan"
          class="p-2 bg-deep-forest text-cream rounded-full disabled:opacity-50 disabled:cursor-not-allowed hover:bg-deep-forest/90 transition-colors"
        >
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick, onMounted, onScopeDispose } from 'vue'
import { useLocaleStore } from '../stores/locale'
import { useChatSession } from '../composables/useChatSession'

const locale = useLocaleStore()
const { messages, sessionId, sendMessage: addMessage, touch } = useChatSession()

onMounted(() => touch())

const isOpen = ref(false)
const inputValue = ref('')
const isStreaming = ref(false)
const errorMessage = ref('')
const messageContainer = ref(null)
const triggerButton = ref(null)
const inputField = ref(null)

let abortController = null

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2)
}

function abortStream() {
  if (abortController) {
    abortController.abort()
    abortController = null
  }
}

onScopeDispose(abortStream)

function formatTime(timestamp) {
  if (!timestamp) return ''
  const date = new Date(timestamp)
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function scrollToBottom() {
  nextTick(() => {
    if (messageContainer.value) {
      messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
  })
}

function openChat() {
  isOpen.value = true
  nextTick(() => inputField.value?.focus())
}

function closeChat() {
  isOpen.value = false
  abortStream()
  nextTick(() => triggerButton.value?.focus())
}

watch(() => messages.value, scrollToBottom, { deep: true })
watch(() => isStreaming.value, scrollToBottom)

async function handleSend() {
  const content = inputValue.value.trim()
  if (!content || isStreaming.value) return

  inputValue.value = ''
  errorMessage.value = ''

  addMessage('user', content)
  isStreaming.value = true

  const botMessageIndex = messages.value.length
  messages.value = [...messages.value, { id: generateId(), role: 'assistant', content: '', timestamp: Date.now() }]
  touch()

  abortController = new AbortController()

  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: messages.value.filter(m => m.content).map(m => ({ role: m.role, content: m.content })),
        sessionId: sessionId.value,
      }),
      signal: abortController.signal,
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const reader = response.body.getReader()
    const decoder = new TextDecoder()
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      if (done) break

      buffer += decoder.decode(value, { stream: true })
      const lines = buffer.split('\n')
      buffer = lines.pop() || ''

      for (const line of lines) {
        if (!line || !line.startsWith('data: ')) continue
        try {
          const data = JSON.parse(line.slice(6))
          if (data.done) break
          if (data.content) {
            const updated = [...messages.value]
            updated[botMessageIndex] = {
              ...updated[botMessageIndex],
              content: updated[botMessageIndex].content + data.content,
            }
            messages.value = updated
          }
        } catch {
          // Skip malformed line
        }
      }
    }
  } catch (error) {
    if (error.name === 'AbortError') return
    errorMessage.value = locale.t.chat?.error || 'An error occurred. Please try again.'
    messages.value = messages.value.filter(m => m.content)
  } finally {
    isStreaming.value = false
    abortController = null
    touch()
  }
}
</script>

<style scoped>
@keyframes pulse-ring {
  0% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.1);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
}

.animate-pulse-ring {
  animation: pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes bounce-dot {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

.animate-bounce-dot {
  animation: bounce-dot 1.4s infinite ease-in-out both;
}
</style>
