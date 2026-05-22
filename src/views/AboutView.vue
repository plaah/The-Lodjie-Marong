<template>
  <main class="pt-20">
    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <div class="grid md:grid-cols-12 gap-8 items-center">
        <div class="md:col-span-5 reveal">
          <span class="font-label text-label text-warm-stone mb-4 block uppercase">{{ locale.t.about.subtitle }}</span>
          <h2 class="font-headline text-headline text-deep-forest mb-8 italic">{{ locale.t.about.title }}</h2>
          <p class="text-body-lg text-on-surface-variant leading-relaxed mb-6 font-light">
            {{ locale.t.about.story }}
          </p>
          <p class="text-body text-on-surface-variant leading-relaxed font-light italic">
            "{{ locale.t.about.quote }}"
          </p>
        </div>
        <div class="md:col-span-6 md:col-start-7 relative reveal delay-200">
          <div class="aspect-[4/5] bg-sage-wash overflow-hidden">
            <img
              src="/images/gallery-2.svg"
              alt="The Lodjie Marong heritage hall"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-section bg-sage-wash px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <h2 class="font-headline text-headline text-deep-forest mb-12 text-center reveal">{{ locale.t.about.facilitiesTitle }}</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(facility, key) in locale.t.about.facilities"
          :key="key"
          class="bg-cream p-8 reveal"
        >
          <h3 class="font-headline text-xl text-deep-forest mb-3">{{ facility.title }}</h3>
          <p class="text-body text-on-surface-variant font-light">{{ facility.description }}</p>
        </div>
      </div>
    </section>

    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <div class="grid md:grid-cols-12 gap-8 items-center">
        <div class="md:col-span-4 reveal">
          <h2 class="font-headline text-headline text-deep-forest mb-8">{{ locale.t.about.locationTitle }}</h2>
          <p class="text-body text-on-surface-variant font-light mb-8">{{ locale.t.about.locationAddress }}</p>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-label text-label text-deep-forest uppercase">{{ locale.t.about.locationLabel }}</p>
                <p class="text-body font-light">{{ locale.t.about.locationAddress }}</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="font-label text-label text-deep-forest uppercase">{{ locale.t.about.hoursLabel }}</p>
                <p class="text-body font-light whitespace-pre-line">{{ locale.t.about.locationHours }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-span-8 h-[400px] bg-sage-wash reveal delay-200 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
          <img
            src="/images/gallery-4.svg"
            alt="Map location visualization"
            class="w-full h-full object-cover opacity-60"
            loading="lazy"
          />
          <div class="absolute inset-0 flex items-center justify-center">
            <a
              href="https://maps.google.com/?q=The+Lodjie+Marong+Wonosobo"
              target="_blank"
              rel="noopener noreferrer"
              class="p-6 bg-cream shadow-xl flex items-center gap-4 hover:shadow-2xl transition-all"
            >
              <svg class="w-6 h-6 text-deep-forest" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              <span class="font-label text-label text-deep-forest uppercase tracking-widest">{{ locale.t.common.mapsCta }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'
import { useScrollReveal } from '../composables/useScrollReveal'

const locale = useLocaleStore()
useScrollReveal()
</script>
