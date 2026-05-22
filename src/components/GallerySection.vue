<template>
  <section class="py-section bg-sage-wash overflow-hidden">
    <div class="px-margin-x-mobile md:px-margin-x max-w-container mx-auto mb-16 reveal">
      <h2 class="font-headline text-headline text-deep-forest">{{ title }}</h2>
      <p class="mt-4 text-body-lg text-on-surface-variant max-w-2xl font-light">{{ subtitle }}</p>
    </div>
    <div class="flex overflow-x-auto gap-8 px-margin-x-mobile md:px-margin-x custom-scrollbar pb-10">
      <div
        v-for="(item, index) in items"
        :key="item.image"
        class="flex-shrink-0 w-[350px] md:w-[400px] h-[500px] md:h-[550px] bg-white p-4 reveal"
        :style="{ transitionDelay: `${(index + 1) * 0.1}s` }"
      >
        <img
          :src="item.image"
          :alt="item.alt"
          class="w-full h-full object-cover"
          loading="lazy"
        />
        <p class="mt-4 font-label text-label text-deep-forest uppercase">{{ item.label }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'

defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  items: { type: Array, required: true }
})

useScrollReveal()
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  height: 2px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: #f1f1f1;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: #2A3B2C;
}
</style>
