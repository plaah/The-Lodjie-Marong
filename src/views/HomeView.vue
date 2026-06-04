<template>
  <main>
    <HeroSection
      :subtitle="locale.t.home.heroSubtitle"
      :title="locale.t.home.heroTitle"
      :cta-text="locale.t.home.heroCta"
      cta-link="/about"
    />

    <GallerySection
      :title="locale.t.home.galleryTitle"
      :subtitle="locale.t.home.gallerySubtitle"
      :items="galleryItems"
    />

    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto text-center reveal">
      <h2 class="font-headline text-headline text-deep-forest mb-6">{{ locale.t.home.valueTitle }}</h2>
      <p class="text-body-lg text-on-surface-variant max-w-2xl mx-auto mb-10 font-light">
        {{ locale.t.home.valueDescription }}
      </p>
      <router-link
        to="/about"
        class="inline-block px-10 py-4 border-2 border-deep-forest text-deep-forest font-label text-label tracking-[0.2em] uppercase hover:bg-deep-forest hover:text-cream transition-all"
      >
        {{ locale.t.home.valueCta }}
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

const locale = useLocaleStore()
useScrollReveal()

const galleryItems = computed(() => [
  { image: '/images/wa-1.jpeg', alt: locale.t.home.galleryItems.garden, label: locale.t.home.galleryItems.garden },
  { image: '/images/wa-2.jpeg', alt: locale.t.home.galleryItems.hall, label: locale.t.home.galleryItems.hall },
  { image: '/images/wa-3.jpeg', alt: locale.t.home.galleryItems.bridal, label: locale.t.home.galleryItems.bridal },
  { image: '/images/wa-4.jpeg', alt: locale.t.home.galleryItems.lawn, label: locale.t.home.galleryItems.lawn }
])
</script>
