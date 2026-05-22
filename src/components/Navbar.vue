<template>
  <header class="fixed top-0 w-full z-50 h-20 bg-cream/80 backdrop-blur-md border-b border-warm-stone/20">
    <nav class="flex justify-between items-center px-margin-x-mobile md:px-margin-x max-w-container mx-auto h-full">
      <router-link
        to="/"
        class="font-headline text-xl text-deep-forest tracking-widest uppercase"
      >
        The Lodjie Marong
      </router-link>

      <div class="hidden md:flex gap-10 items-center">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-label font-label text-on-surface-variant hover:text-deep-forest transition-colors uppercase tracking-widest"
          :class="{ 'text-deep-forest border-b-2 border-deep-forest pb-1': isActive(item.path) }"
        >
          {{ locale.t.nav[item.key] }}
        </router-link>
        <router-link
          to="/contact"
          class="ml-4 px-6 py-2 bg-deep-forest text-cream font-label text-[10px] tracking-[0.2em] uppercase hover:bg-opacity-90 transition-all active:scale-95"
        >
          {{ locale.t.nav.enquire }}
        </router-link>
        <LanguageToggle />
      </div>

      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        :aria-expanded="mobileMenuOpen"
        class="md:hidden text-deep-forest p-2"
        aria-label="Toggle menu"
      >
        <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-cream border-t border-warm-stone/20 px-margin-x-mobile py-6"
    >
      <div class="flex flex-col gap-4">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="text-label font-label text-on-surface-variant hover:text-deep-forest transition-colors uppercase tracking-widest py-2"
          :class="{ 'text-deep-forest': isActive(item.path) }"
        >
          {{ locale.t.nav[item.key] }}
        </router-link>
        <LanguageToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useLocaleStore } from '../stores/locale'
import LanguageToggle from './LanguageToggle.vue'

const route = useRoute()
const locale = useLocaleStore()
const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/events', key: 'events' },
  { path: '/contact', key: 'contact' }
]

function isActive(path) {
  return route.path === path
}
</script>
