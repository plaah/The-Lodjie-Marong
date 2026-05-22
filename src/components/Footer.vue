<template>
  <footer class="bg-deep-forest w-full py-20 px-margin-x-mobile md:px-margin-x text-cream">
    <div class="flex flex-col items-center text-center max-w-container mx-auto">
      <h2 class="font-headline text-3xl text-cream mb-4 uppercase tracking-[0.4em]">
        The Lodjie Marong
      </h2>
      <p class="text-body text-cream/70 max-w-lg mb-12">
        {{ t.footer.description }}
      </p>
      <div class="flex gap-8 mb-12">
        <a href="#" class="text-body text-cream/70 hover:text-cream transition-colors">Instagram</a>
        <a href="#" class="text-body text-cream/70 hover:text-cream transition-colors">Facebook</a>
        <a href="#" class="text-body text-cream/70 hover:text-cream transition-colors">Pinterest</a>
      </div>
      <div class="text-body text-cream/50 border-t border-cream/10 pt-12 w-full">
        {{ t.footer.copyright }}
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'

const { t } = useLocaleStore()
</script>
