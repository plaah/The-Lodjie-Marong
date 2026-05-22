<template>
  <section class="relative h-screen w-full overflow-hidden flex items-center justify-center">
    <div class="absolute inset-0 z-0">
      <img
        :src="imageSrc"
        :alt="altText"
        class="w-full h-full object-cover hero-zoom"
        loading="eager"
      />
      <div class="absolute inset-0 bg-black/20"></div>
    </div>
    <div class="relative z-10 text-center px-margin-x-mobile">
      <span class="block font-label text-label text-cream mb-6 tracking-[0.3em] uppercase reveal">
        {{ subtitle }}
      </span>
      <h1 class="font-headline text-display-mobile md:text-display text-cream reveal delay-100 italic">
        {{ title }}
      </h1>
      <div class="mt-12 reveal delay-200">
        <router-link
          :to="ctaLink"
          class="px-10 py-4 border border-cream text-cream font-label text-label tracking-[0.2em] uppercase hover:bg-cream hover:text-deep-forest transition-all"
        >
          {{ ctaText }}
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'

defineProps({
  imageSrc: { type: String, default: '/images/hero.jpeg' },
  altText: { type: String, default: 'The Lodjie Marong venue' },
  subtitle: { type: String, required: true },
  title: { type: String, required: true },
  ctaText: { type: String, required: true },
  ctaLink: { type: String, default: '/about' }
})

useScrollReveal()
</script>

<style scoped>
.hero-zoom {
  transition: transform 20s linear;
}
</style>
