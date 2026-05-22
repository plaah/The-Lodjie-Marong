<template>
  <transition name="loading-fade">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-deep-forest"
    >
      <div class="flex flex-col items-center">
        <img
          src="/images/logo.png"
          alt="The Lodjie Marong"
          class="h-24 w-auto mb-8 animate-pulse"
          style="filter: brightness(0) saturate(100%) invert(95%) sepia(5%) saturate(200%) hue-rotate(90deg);"
        />
        <div class="flex gap-2">
          <span
            class="w-2 h-2 rounded-full bg-cream/60 animate-bounce"
            style="animation-delay: 0ms;"
          ></span>
          <span
            class="w-2 h-2 rounded-full bg-cream/60 animate-bounce"
            style="animation-delay: 150ms;"
          ></span>
          <span
            class="w-2 h-2 rounded-full bg-cream/60 animate-bounce"
            style="animation-delay: 300ms;"
          ></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const visible = ref(true)

onMounted(() => {
  setTimeout(() => {
    visible.value = false
  }, 1500)
})
</script>

<style scoped>
.loading-fade-enter-active {
  transition: opacity 0.6s ease-out;
}
.loading-fade-leave-active {
  transition: opacity 0.8s ease-out;
}
.loading-fade-enter-from,
.loading-fade-leave-to {
  opacity: 0;
}
</style>
