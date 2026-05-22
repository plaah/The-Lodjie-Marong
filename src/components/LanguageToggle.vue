<template>
  <button
    @click="locale.toggleLocale"
    class="px-3 py-1 text-label font-label text-deep-forest border border-deep-forest/30 hover:bg-deep-forest hover:text-cream transition-all uppercase tracking-widest"
    :aria-label="'Switch to ' + (locale.currentLocale === 'id' ? 'English' : 'Bahasa Indonesia')"
  >
    {{ locale.t.common.language }}
  </button>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'

const locale = useLocaleStore()
</script>
