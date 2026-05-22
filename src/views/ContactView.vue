<template>
  <main class="pt-20">
    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <div class="text-center mb-16 reveal">
        <h2 class="font-headline text-headline text-deep-forest mb-12 italic">{{ locale.t.contact.title }}</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <div class="reveal">
          <ContactForm />
        </div>

        <div class="space-y-10 reveal delay-200">
          <WhatsAppButton
            :label="locale.t.contact.whatsapp"
            phone="6282223115231"
            message="Halo, saya tertarik dengan The Lodjie Marong. Bisa info lebih lanjut?"
          />

          <div class="border-t border-warm-stone/20 pt-8">
            <h3 class="font-headline text-xl text-deep-forest mb-6">{{ locale.t.contact.contactInfo.title }}</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="font-label text-label text-deep-forest uppercase">{{ locale.t.contact.contactInfo.phone }}</p>
                  <p class="text-body font-light">+62 812-3456-7890</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="font-label text-label text-deep-forest uppercase">{{ locale.t.contact.contactInfo.email }}</p>
                  <p class="text-body font-light">info@lodjiemarong.com</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="font-label text-label text-deep-forest uppercase">{{ locale.t.contact.contactInfo.hours }}</p>
                  <p class="text-body font-light whitespace-pre-line">{{ locale.t.contact.contactInfo.hours }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'
import { useScrollReveal } from '../composables/useScrollReveal'
import ContactForm from '../components/ContactForm.vue'
import WhatsAppButton from '../components/WhatsAppButton.vue'

const locale = useLocaleStore()
useScrollReveal()
</script>
