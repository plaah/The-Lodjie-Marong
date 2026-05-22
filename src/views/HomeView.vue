<template>
  <main>
    <HeroSection
      :subtitle="t.home.heroSubtitle"
      :title="t.home.heroTitle"
      :cta-text="t.home.heroCta"
      cta-link="/about"
    />

    <GallerySection
      :title="t.home.galleryTitle"
      :subtitle="t.home.gallerySubtitle"
      :items="galleryItems"
    />

    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto text-center reveal">
      <h2 class="font-headline text-headline text-deep-forest mb-6">{{ t.home.valueTitle }}</h2>
      <p class="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 font-light">
        {{ t.home.valueDescription }}
      </p>
      <router-link
        to="/about"
        class="inline-block px-10 py-4 border-2 border-deep-forest text-deep-forest font-label text-label tracking-[0.2em] uppercase hover:bg-deep-forest hover:text-cream transition-all"
      >
        {{ t.home.valueCta }}
      </router-link>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useLocaleStore } from '../stores/locale'
import { useScrollReveal } from '../composables/useScrollReveal'
import HeroSection from '../components/HeroSection.vue'
import GallerySection from '../components/GallerySection.vue'

const { t } = useLocaleStore()
useScrollReveal()

const galleryItems = computed(() => [
  { image: '/images/gallery-1.jpg', alt: t.home.galleryItems.garden, label: t.home.galleryItems.garden },
  { image: '/images/gallery-2.jpg', alt: t.home.galleryItems.hall, label: t.home.galleryItems.hall },
  { image: '/images/gallery-3.jpg', alt: t.home.galleryItems.bridal, label: t.home.galleryItems.bridal },
  { image: '/images/gallery-4.jpg', alt: t.home.galleryItems.lawn, label: t.home.galleryItems.lawn }
])
</script>
