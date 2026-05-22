<template>
  <div class="border-t border-cream/20 pt-8 reveal">
    <h3 class="font-headline text-2xl mb-4 italic">{{ name }}</h3>
    <p class="text-body font-light opacity-80 mb-2">{{ description }}</p>
    <p class="text-label text-warm-stone uppercase tracking-widest mb-8">{{ capacity }}</p>
    <ul class="space-y-3 font-label text-[10px] tracking-widest uppercase opacity-60">
      <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
    </ul>
    <div class="mt-8">
      <WhatsAppButton :label="ctaText" />
    </div>
  </div>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'
import WhatsAppButton from './WhatsAppButton.vue'

defineProps({
  name: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: String, required: true },
  features: { type: Array, required: true },
  ctaText: { type: String, default: 'Ask Admin' }
})

useScrollReveal()
</script>
