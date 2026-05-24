<template>
  <footer class="bg-deep-forest w-full py-20 px-margin-x-mobile md:px-margin-x text-cream">
    <div class="flex flex-col items-center text-center max-w-container mx-auto">
      <img
        src="/images/logo.png"
        alt="The Lodjie Marong"
        class="h-16 w-auto mb-4"
      />
      <p class="text-body text-cream/70 max-w-lg mb-12">
        {{ locale.t.footer.description }}
      </p>
      <div class="flex gap-8 mb-12">
        <a href="#" @click.prevent aria-label="Instagram" class="text-body text-cream/70 hover:text-cream transition-colors cursor-default">Instagram</a>
        <a href="#" @click.prevent aria-label="Facebook" class="text-body text-cream/70 hover:text-cream transition-colors cursor-default">Facebook</a>
        <a href="#" @click.prevent aria-label="Pinterest" class="text-body text-cream/70 hover:text-cream transition-colors cursor-default">Pinterest</a>
      </div>
      <div class="text-body text-cream/50 border-t border-cream/10 pt-12 w-full">
        {{ locale.t.footer.copyright }}
      </div>
    </div>
  </footer>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'

const locale = useLocaleStore()
</script>
