<template>
  <main class="pt-20">
    <section class="py-section bg-deep-forest text-cream px-margin-x-mobile md:px-margin-x max-w-container mx-auto text-center">
      <span class="font-label text-label text-on-primary-container mb-4 block uppercase">{{ locale.t.events.subtitle }}</span>
      <h2 class="font-headline text-headline mb-16">{{ locale.t.events.title }}</h2>
      <div class="grid md:grid-cols-3 gap-12 text-left">
        <PackageCard
          :name="locale.t.events.packages.intimate.name"
          :description="locale.t.events.packages.intimate.description"
          :capacity="locale.t.events.packages.intimate.capacity"
          :features="locale.t.events.packages.intimate.features"
          :cta-text="locale.t.events.packages.intimate.cta"
        />
        <PackageCard
          :name="locale.t.events.packages.signature.name"
          :description="locale.t.events.packages.signature.description"
          :capacity="locale.t.events.packages.signature.capacity"
          :features="locale.t.events.packages.signature.features"
          :cta-text="locale.t.events.packages.signature.cta"
        />
        <PackageCard
          :name="locale.t.events.packages.estate.name"
          :description="locale.t.events.packages.estate.description"
          :capacity="locale.t.events.packages.estate.capacity"
          :features="locale.t.events.packages.estate.features"
          :cta-text="locale.t.events.packages.estate.cta"
        />
      </div>
    </section>

    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <div class="text-center mb-16 reveal">
        <h2 class="font-headline text-headline text-deep-forest mb-4">{{ locale.t.events.galleryTitle }}</h2>
        <p class="text-body-lg text-on-surface-variant max-w-2xl mx-auto font-light">{{ locale.t.events.gallerySubtitle }}</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="aspect-[4/3] bg-sage-wash overflow-hidden reveal"
          :style="{ transitionDelay: `${(i % 3 + 1) * 0.1}s` }"
        >
          <img
            :src="`/images/wa-${((i - 1) % 6) + 1}.jpeg`"
            :alt="`Event photo ${i}`"
            class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>
    </section>

    <section class="py-section bg-sage-wash text-center px-margin-x-mobile md:px-margin-x max-w-container mx-auto reveal">
      <router-link
        to="/contact"
        class="inline-block px-12 py-5 bg-deep-forest text-cream font-label text-label tracking-[0.2em] uppercase hover:bg-opacity-90 transition-all active:scale-95"
      >
        {{ locale.t.events.cta }}
      </router-link>
    </section>
  </main>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'
import { useScrollReveal } from '../composables/useScrollReveal'
import PackageCard from '../components/PackageCard.vue'

const locale = useLocaleStore()
useScrollReveal()
</script>
