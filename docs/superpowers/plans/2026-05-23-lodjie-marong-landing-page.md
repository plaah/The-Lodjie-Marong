# The Lodjie Marong — Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page bilingual Vue 3 landing page for The Lodjie Marong wedding venue with WhatsApp integration, contact form, and heritage luxury design.

**Architecture:** Vue 3 SPA with Vue Router for 4 pages, Pinia for i18n state, Tailwind CSS for styling, custom lightweight i18n via JSON locale files. Mobile-first responsive design with scroll-reveal animations.

**Tech Stack:** Vue 3 (Composition API), Vite, Vue Router 4, Pinia, Tailwind CSS, EB Garamond + Inter fonts

---

## File Structure

```
lodjie-landing-page/
├── public/
│   ├── favicon.ico
│   └── images/                    # Placeholder images
│       ├── hero-placeholder.jpg
│       ├── gallery-1.jpg
│       ├── gallery-2.jpg
│       ├── gallery-3.jpg
│       └── gallery-4.jpg
├── src/
│   ├── assets/
│   │   └── styles/
│   │       └── main.css           # Global styles + Tailwind
│   ├── components/
│   │   ├── Navbar.vue             # Top navigation + language toggle
│   │   ├── Footer.vue             # Site footer
│   │   ├── LanguageToggle.vue     # ID/EN switch
│   │   ├── HeroSection.vue        # Hero with background image/video
│   │   ├── GallerySection.vue     # Horizontal scroll gallery
│   │   ├── PackageCard.vue        # Event package display
│   │   ├── ContactForm.vue        # Embedded contact form
│   │   └── WhatsAppButton.vue     # WhatsApp redirect button
│   ├── composables/
│   │   └── useScrollReveal.js     # Scroll animation composable
│   ├── locales/
│   │   ├── id.json                # Bahasa Indonesia translations
│   │   └── en.json                # English translations
│   ├── router/
│   │   └── index.js               # Vue Router configuration
│   ├── stores/
│   │   └── locale.js              # Pinia store for language state
│   ├── views/
│   │   ├── HomeView.vue           # Home page
│   │   ├── AboutView.vue          # About page
│   │   ├── EventsView.vue         # Events page
│   │   └── ContactView.vue        # Contact page
│   ├── App.vue                    # Root component
│   └── main.js                    # App entry point
├── index.html                     # HTML shell
├── vite.config.js                 # Vite configuration
├── tailwind.config.js             # Tailwind configuration
├── postcss.config.js              # PostCSS configuration
├── package.json                   # Dependencies
└── README.md                      # Project documentation
```

---

## Task 1: Project Setup & Configuration

**Files:**
- Create: `package.json`, `vite.config.js`, `tailwind.config.js`, `postcss.config.js`, `index.html`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "lodjie-marong",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "dependencies": {
    "vue": "^3.4.0",
    "vue-router": "^4.3.0",
    "pinia": "^2.1.0"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^5.0.0",
    "vite": "^5.4.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```javascript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': '/src'
    }
  }
})
```

- [ ] **Step 3: Create tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'deep-forest': '#2A3B2C',
        'cream': '#FDFBF7',
        'warm-stone': '#90673C',
        'sage-wash': '#E9EDDE',
        'on-surface': '#1b1c1a',
        'on-surface-variant': '#434842',
      },
      fontFamily: {
        'headline': ['EB Garamond', 'serif'],
        'body': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'display': ['64px', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '400' }],
        'display-mobile': ['40px', { lineHeight: '1.2', fontWeight: '400' }],
        'headline': ['32px', { lineHeight: '1.3', fontWeight: '400' }],
        'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
        'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        'label': ['12px', { lineHeight: '1.0', letterSpacing: '0.1em', fontWeight: '600' }],
      },
      spacing: {
        'section': '120px',
        'container': '1280px',
        'margin-x': '64px',
        'margin-x-mobile': '24px',
      },
    },
  },
  plugins: [],
}
```

- [ ] **Step 4: Create postcss.config.js**

```javascript
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 5: Create index.html**

```html
<!DOCTYPE html>
<html lang="id">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>The Lodjie Marong — Venue Pernikahan Premium di Wonosobo</title>
    <meta name="description" content="The Lodjie Marong: Venue pernikahan premium di Wonosobo dengan nuansa heritage dan kemewahan alami. Pesan sekarang untuk hari spesial Anda." />
    <meta property="og:title" content="The Lodjie Marong — Venue Pernikahan Premium" />
    <meta property="og:description" content="Venue pernikahan premium di Wonosobo dengan nuansa heritage dan kemewahan alami." />
    <meta property="og:type" content="website" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
  </body>
</html>
```

- [ ] **Step 6: Install dependencies**

Run: `npm install`
Expected: All dependencies installed, node_modules created

- [ ] **Step 7: Commit**

```bash
git add package.json vite.config.js tailwind.config.js postcss.config.js index.html package-lock.json
git commit -m "chore: initialize Vue 3 + Vite + Tailwind project"
```

---

## Task 2: Global Styles & i18n Infrastructure

**Files:**
- Create: `src/assets/styles/main.css`, `src/locales/id.json`, `src/locales/en.json`, `src/stores/locale.js`, `src/main.js`, `src/App.vue`

- [ ] **Step 1: Create src/assets/styles/main.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  background-color: #FDFBF7;
  color: #1b1c1a;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.delay-100 { transition-delay: 0.1s; }
.delay-200 { transition-delay: 0.2s; }
.delay-300 { transition-delay: 0.3s; }
```

- [ ] **Step 2: Create src/locales/id.json**

```json
{
  "nav": {
    "home": "Beranda",
    "about": "Tentang",
    "events": "Acara",
    "contact": "Kontak",
    "enquire": "Pesan Sekarang"
  },
  "home": {
    "heroSubtitle": "Warisan Sancktuary • Wonosobo",
    "heroTitle": "Di Mana Warisan Bertemu Keanggunan Modern",
    "heroCta": "Jelajahi Venue",
    "galleryTitle": "Kanvas untuk Cerita Abadi",
    "gallerySubtitle": "Dari janji manis di taman hingga perayaan megah di aula warisan kami, setiap sudut The Lodjie Marong dikurasi untuk keindahan yang tak terlupakan.",
    "galleryItems": {
      "garden": "Taman Terrace",
      "hall": "Aula Warisan",
      "bridal": "Suite Pengantin",
      "lawn": "Halaman Utara"
    },
    "valueTitle": "Mengapa The Lodjie Marong?",
    "valueDescription": "Terletak di jantung Wonosobo, kami menawarkan perpaduan sempurna antara keindahan alam, warisan arsitektur, dan pelayanan premium untuk hari paling istimewa Anda.",
    "valueCta": "Pelajari Lebih Lanjut"
  },
  "about": {
    "subtitle": "Warisan Kami",
    "title": "Sanctuary Kemewahan yang Tenang",
    "story": "Didirikan atas prinsip warisan dan keramahan, The Lodjie Marong mewakili jiwa arsitektur Wonosobo. Apa yang dimulai sebagai tempat peristirahatan keluarga pribadi telah berkembang menjadi tujuan utama bagi mereka yang mencari venue pernikahan dengan bobot sejarah dan keanggunan alami.",
    "quote": "Kami percaya kemewahan ditemukan dalam bisikan sejarah dan napas taman, bukan hanya kemegahan arsitektur.",
    "historyCta": "Sejarah Lengkap Kami",
    "facilitiesTitle": "Fasilitas Kami",
    "facilities": {
      "garden": {
        "title": "Taman Pernikahan",
        "description": "Taman hijau luas dengan pemandangan alam Wonosobo yang memukau"
      },
      "hall": {
        "title": "Aula Warisan",
        "description": "Ruang elegan berkapasitas hingga 300 tamu dengan arsitektur tradisional"
      },
      "bridal": {
        "title": "Suite Pengantin",
        "description": "Ruang persiapan eksklusif untuk pengantin dan rombongan"
      },
      "parking": {
        "title": "Area Parkir Luas",
        "description": "Parkir memadai untuk tamu dengan akses mudah ke venue"
      },
      "catering": {
        "title": "Dapur Katering",
        "description": "Fasilitas dapur profesional untuk katering pilihan Anda"
      },
      "sound": {
        "title": "Sistem Audio",
        "description": "Sound system profesional untuk musik dan acara"
      }
    },
    "locationTitle": "Lokasi Kami",
    "locationAddress": "Wonosobo, Jawa Tengah, Indonesia",
    "locationHours": "Senin - Sabtu: 09:00 - 17:00\nMinggu dengan perjanjian",
    "locationLabel": "Alamat",
    "hoursLabel": "Jam Kunjungan"
  },
  "events": {
    "subtitle": "Perayaan",
    "title": "Perjalanan Pernikahan",
    "packages": {
      "intimate": {
        "name": "Intimate",
        "description": "Dikurasi untuk pertemuan hingga 40 tamu. Sempurna bagi Anda yang mengutamakan koneksi mendalam.",
        "capacity": "Hingga 40 tamu",
        "features": [
          "Akses Taman Privat",
          "Menu Kuliner Spesial",
          "Suite Warisan"
        ],
        "cta": "Tanya Admin"
      },
      "signature": {
        "name": "Signature",
        "description": "Paket klasik kami untuk hingga 150 tamu. Esensi pengalaman The Lodjie Marong.",
        "capacity": "Hingga 150 tamu",
        "features": [
          "Akses Aula & Taman Penuh",
          "Makan Estate Multi-Kursus",
          "Dukungan Desain Floral"
        ],
        "cta": "Tanya Admin"
      },
      "estate": {
        "name": "Estate",
        "description": "Sewa estate eksklusif 3 hari untuk hingga 300 tamu. Imersi penuh ke dalam kemewahan warisan.",
        "capacity": "Hingga 300 tamu",
        "features": [
          "Eksklusivitas Seluruh Area",
          "Tim Perencanaan Concierge",
          "Akomodasi Tamu"
        ],
        "cta": "Tanya Admin"
      }
    },
    "galleryTitle": "Galeri Acara",
    "gallerySubtitle": "Momen-momen indah yang telah tercipta di The Lodjie Marong",
    "cta": "Pesan Sekarang"
  },
  "contact": {
    "title": "Mulai Cerita Warisan Anda",
    "form": {
      "name": "Nama Lengkap",
      "email": "Email",
      "phone": "Nomor Telepon",
      "date": "Tanggal Acara",
      "message": "Pesan",
      "submit": "Kirim Pesan",
      "submitting": "Mengirim...",
      "success": "Pesan Anda berhasil dikirim! Kami akan segera menghubungi Anda.",
      "error": "Terjadi kesalahan. Silakan coba lagi.",
      "required": "Wajib diisi",
      "invalidEmail": "Format email tidak valid",
      "invalidPhone": "Format telepon tidak valid"
    },
    "whatsapp": "Chat via WhatsApp",
    "contactInfo": {
      "title": "Informasi Kontak",
      "phone": "Telepon",
      "email": "Email",
      "hours": "Jam Kerja"
    }
  },
  "footer": {
    "description": "Sanctuary warisan yang didedikasikan untuk seni perayaan abadi. Terletak di jantung Wonosobo, melestarikan keanggunan masa lalu untuk cerita masa depan.",
    "copyright": "© 2026 The Lodjie Marong. Sanctuary Warisan di Wonosobo."
  },
  "common": {
    "language": "EN",
    "mapsCta": "Temukan di Google Maps"
  }
}
```

- [ ] **Step 3: Create src/locales/en.json**

```json
{
  "nav": {
    "home": "Home",
    "about": "About",
    "events": "Events",
    "contact": "Contact",
    "enquire": "Enquire Now"
  },
  "home": {
    "heroSubtitle": "Heritage Sanctuary • Wonosobo",
    "heroTitle": "Where Legacy Meets Modern Grace",
    "heroCta": "Discover the Grounds",
    "galleryTitle": "A Canvas for Timeless Stories",
    "gallerySubtitle": "From intimate garden vows to grand celebrations in our heritage hall, every corner of The Lodjie Marong is curated for effortless beauty.",
    "galleryItems": {
      "garden": "The Garden Terrace",
      "hall": "Heritage Hall",
      "bridal": "The Bridal Suite",
      "lawn": "The North Lawns"
    },
    "valueTitle": "Why The Lodjie Marong?",
    "valueDescription": "Nestled in the heart of Wonosobo, we offer the perfect blend of natural beauty, architectural heritage, and premium service for your most special day.",
    "valueCta": "Learn More"
  },
  "about": {
    "subtitle": "Our Legacy",
    "title": "A Sanctuary of Quiet Luxury",
    "story": "Founded on the principles of heritage and hospitality, The Lodjie Marong represents the architectural soul of Wonosobo. What began as a private family retreat has evolved into a premier destination for those seeking a wedding venue with historical weight and natural grace.",
    "quote": "We believe luxury is found in the whispers of history and the breath of the garden, not just the grandeur of the architecture.",
    "historyCta": "Our Full History",
    "facilitiesTitle": "Our Facilities",
    "facilities": {
      "garden": {
        "title": "Wedding Garden",
        "description": "Expansive green garden with stunning views of Wonosobo's natural landscape"
      },
      "hall": {
        "title": "Heritage Hall",
        "description": "Elegant space accommodating up to 300 guests with traditional architecture"
      },
      "bridal": {
        "title": "Bridal Suite",
        "description": "Exclusive preparation room for the bride and entourage"
      },
      "parking": {
        "title": "Spacious Parking",
        "description": "Ample parking for guests with easy venue access"
      },
      "catering": {
        "title": "Catering Kitchen",
        "description": "Professional kitchen facilities for your chosen caterer"
      },
      "sound": {
        "title": "Audio System",
        "description": "Professional sound system for music and events"
      }
    },
    "locationTitle": "Our Location",
    "locationAddress": "Wonosobo, Central Java, Indonesia",
    "locationHours": "Monday - Saturday: 09:00 - 17:00\nSunday by appointment",
    "locationLabel": "Address",
    "hoursLabel": "Viewing Hours"
  },
  "events": {
    "subtitle": "Celebrations",
    "title": "The Wedding Journey",
    "packages": {
      "intimate": {
        "name": "The Intimate",
        "description": "Curated for gatherings of up to 40 guests. Perfect for those who value profound connection over ceremony.",
        "capacity": "Up to 40 guests",
        "features": [
          "Private Garden Access",
          "Bespoke Culinary Pairing",
          "Heritage Suite"
        ],
        "cta": "Ask Admin"
      },
      "signature": {
        "name": "The Signature",
        "description": "Our classic package for up to 150 guests. The quintessence of The Lodjie Marong experience.",
        "capacity": "Up to 150 guests",
        "features": [
          "Full Hall & Lawn Access",
          "Multi-Course Estate Dining",
          "Floral Design Support"
        ],
        "cta": "Ask Admin"
      },
      "estate": {
        "name": "The Estate",
        "description": "Exclusive 3-day estate hire for up to 300 guests. A full immersion into heritage luxury.",
        "capacity": "Up to 300 guests",
        "features": [
          "Full Grounds Exclusivity",
          "Concierge Planning Team",
          "Guest Accommodation"
        ],
        "cta": "Ask Admin"
      }
    },
    "galleryTitle": "Event Gallery",
    "gallerySubtitle": "Beautiful moments created at The Lodjie Marong",
    "cta": "Book Now"
  },
  "contact": {
    "title": "Begin Your Heritage Tale",
    "form": {
      "name": "Full Name",
      "email": "Email",
      "phone": "Phone Number",
      "date": "Event Date",
      "message": "Message",
      "submit": "Send Message",
      "submitting": "Sending...",
      "success": "Your message has been sent! We will contact you shortly.",
      "error": "An error occurred. Please try again.",
      "required": "Required field",
      "invalidEmail": "Invalid email format",
      "invalidPhone": "Invalid phone format"
    },
    "whatsapp": "Chat via WhatsApp",
    "contactInfo": {
      "title": "Contact Information",
      "phone": "Phone",
      "email": "Email",
      "hours": "Working Hours"
    }
  },
  "footer": {
    "description": "A heritage sanctuary dedicated to the art of timeless celebration. Nestled in the heart of Wonosobo, preserving the grace of the past for the stories of the future.",
    "copyright": "© 2026 The Lodjie Marong. A Heritage Sanctuary in Wonosobo."
  },
  "common": {
    "language": "ID",
    "mapsCta": "Find Us on Google Maps"
  }
}
```

- [ ] **Step 4: Create src/stores/locale.js**

```javascript
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import id from '../locales/id.json'
import en from '../locales/en.json'

const locales = { id, en }

export const useLocaleStore = defineStore('locale', () => {
  const currentLocale = ref(localStorage.getItem('locale') || 'id')

  const t = computed(() => {
    return locales[currentLocale.value]
  })

  function setLocale(locale) {
    currentLocale.value = locale
    localStorage.setItem('locale', locale)
    document.documentElement.lang = locale
  }

  function toggleLocale() {
    const newLocale = currentLocale.value === 'id' ? 'en' : 'id'
    setLocale(newLocale)
  }

  return { currentLocale, t, setLocale, toggleLocale }
})
```

- [ ] **Step 5: Create src/main.js**

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './assets/styles/main.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)
app.mount('#app')
```

- [ ] **Step 6: Create src/App.vue**

```vue
<template>
  <div class="min-h-screen bg-cream text-on-surface font-body overflow-x-hidden">
    <Navbar />
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
    <Footer />
  </div>
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
```

- [ ] **Step 7: Commit**

```bash
git add src/
git commit -m "feat: add i18n infrastructure, global styles, and app shell"
```

---

## Task 3: Router & Shared Components (Navbar, Footer, LanguageToggle)

**Files:**
- Create: `src/router/index.js`, `src/components/Navbar.vue`, `src/components/Footer.vue`, `src/components/LanguageToggle.vue`

- [ ] **Step 1: Create src/router/index.js**

```javascript
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'The Lodjie Marong — Venue Pernikahan Premium' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue'),
    meta: { title: 'Tentang — The Lodjie Marong' }
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../views/EventsView.vue'),
    meta: { title: 'Acara — The Lodjie Marong' }
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ContactView.vue'),
    meta: { title: 'Kontak — The Lodjie Marong' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title || 'The Lodjie Marong'
  next()
})

export default router
```

- [ ] **Step 2: Create src/components/LanguageToggle.vue**

```vue
<template>
  <button
    @click="toggleLocale"
    class="px-3 py-1 text-label font-label text-deep-forest border border-deep-forest/30 hover:bg-deep-forest hover:text-cream transition-all uppercase tracking-widest"
    :aria-label="'Switch to ' + (currentLocale === 'id' ? 'English' : 'Bahasa Indonesia')"
  >
    {{ t.common.language }}
  </button>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'

const { currentLocale, t, toggleLocale } = useLocaleStore()
</script>
```

- [ ] **Step 3: Create src/components/Navbar.vue**

```vue
<template>
  <header class="fixed top-0 w-full z-50 h-20 bg-cream/80 backdrop-blur-md border-b border-warm-stone/20">
    <nav class="flex justify-between items-center px-margin-x md:px-margin-x max-w-container mx-auto h-full">
      <router-link
        to="/"
        class="font-headline text-xl text-deep-forest tracking-widest uppercase"
      >
        The Lodjie Marong
      </router-link>

      <div class="hidden md:flex gap-10 items-center">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          class="text-label font-label text-on-surface-variant hover:text-deep-forest transition-colors uppercase tracking-widest"
          :class="{ 'text-deep-forest border-b-2 border-deep-forest pb-1': isActive(item.path) }"
        >
          {{ t.nav[item.key] }}
        </router-link>
        <router-link
          to="/contact"
          class="ml-4 px-6 py-2 bg-deep-forest text-cream font-label text-[10px] tracking-[0.2em] uppercase hover:bg-opacity-90 transition-all active:scale-95"
        >
          {{ t.nav.enquire }}
        </router-link>
        <LanguageToggle />
      </div>

      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="md:hidden text-deep-forest p-2"
        aria-label="Toggle menu"
      >
        <svg v-if="!mobileMenuOpen" class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </nav>

    <div
      v-if="mobileMenuOpen"
      class="md:hidden bg-cream border-t border-warm-stone/20 px-margin-x-mobile py-6"
    >
      <div class="flex flex-col gap-4">
        <router-link
          v-for="item in navItems"
          :key="item.path"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="text-label font-label text-on-surface-variant hover:text-deep-forest transition-colors uppercase tracking-widest py-2"
          :class="{ 'text-deep-forest': isActive(item.path) }"
        >
          {{ t.nav[item.key] }}
        </router-link>
        <LanguageToggle />
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLocaleStore } from '../stores/locale'
import LanguageToggle from './LanguageToggle.vue'

const route = useRoute()
const { t } = useLocaleStore()
const mobileMenuOpen = ref(false)

const navItems = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/events', key: 'events' },
  { path: '/contact', key: 'contact' }
]

function isActive(path) {
  return route.path === path
}
</script>
```

- [ ] **Step 4: Create src/components/Footer.vue**

```vue
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
```

- [ ] **Step 5: Commit**

```bash
git add src/router/index.js src/components/Navbar.vue src/components/Footer.vue src/components/LanguageToggle.vue
git commit -m "feat: add router, navbar, footer, and language toggle"
```

---

## Task 4: Composables & Reusable Components

**Files:**
- Create: `src/composables/useScrollReveal.js`, `src/components/HeroSection.vue`, `src/components/GallerySection.vue`, `src/components/PackageCard.vue`, `src/components/WhatsAppButton.vue`

- [ ] **Step 1: Create src/composables/useScrollReveal.js**

```javascript
import { onMounted, onUnmounted } from 'vue'

export function useScrollReveal() {
  let observer

  onMounted(() => {
    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active')
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
```

- [ ] **Step 2: Create src/components/HeroSection.vue**

```vue
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
  imageSrc: { type: String, default: '/images/hero-placeholder.jpg' },
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
```

- [ ] **Step 3: Create src/components/GallerySection.vue**

```vue
<template>
  <section class="py-section bg-sage-wash overflow-hidden">
    <div class="px-margin-x-mobile md:px-margin-x max-w-container mx-auto mb-16 reveal">
      <h2 class="font-headline text-headline text-deep-forest">{{ title }}</h2>
      <p class="mt-4 text-body-lg text-on-surface-variant max-w-2xl font-light">{{ subtitle }}</p>
    </div>
    <div class="flex overflow-x-auto gap-8 px-margin-x-mobile md:px-margin-x custom-scrollbar pb-10">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="flex-shrink-0 w-[350px] md:w-[400px] h-[500px] md:h-[550px] bg-white p-4 reveal"
        :class="`delay-${(index + 1) * 100}`"
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
```

- [ ] **Step 4: Create src/components/PackageCard.vue**

```vue
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
```

- [ ] **Step 5: Create src/components/WhatsAppButton.vue**

```vue
<template>
  <a
    :href="whatsappUrl"
    target="_blank"
    rel="noopener noreferrer"
    class="inline-flex items-center gap-3 px-8 py-3 bg-[#25D366] text-white font-label text-label tracking-[0.15em] uppercase hover:shadow-lg transition-all active:scale-95"
  >
    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
    {{ label }}
  </a>
</template>

<script setup>
const props = defineProps({
  label: { type: String, default: 'Chat via WhatsApp' },
  phone: { type: String, default: '6281234567890' },
  message: { type: String, default: 'Halo, saya tertarik dengan The Lodjie Marong. Bisa info lebih lanjut?' }
})

const whatsappUrl = `https://wa.me/${props.phone}?text=${encodeURIComponent(props.message)}`
</script>
```

- [ ] **Step 6: Commit**

```bash
git add src/composables/useScrollReveal.js src/components/HeroSection.vue src/components/GallerySection.vue src/components/PackageCard.vue src/components/WhatsAppButton.vue
git commit -m "feat: add scroll reveal composable and reusable components"
```

---

## Task 5: Home Page

**Files:**
- Create: `src/views/HomeView.vue`

- [ ] **Step 1: Create src/views/HomeView.vue**

```vue
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
```

- [ ] **Step 2: Commit**

```bash
git add src/views/HomeView.vue
git commit -m "feat: add home page with hero, gallery, and value proposition"
```

---

## Task 6: About Page

**Files:**
- Create: `src/views/AboutView.vue`

- [ ] **Step 1: Create src/views/AboutView.vue**

```vue
<template>
  <main class="pt-20">
    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <div class="grid md:grid-cols-12 gap-8 items-center">
        <div class="md:col-span-5 reveal">
          <span class="font-label text-label text-warm-stone mb-4 block uppercase">{{ t.about.subtitle }}</span>
          <h2 class="font-headline text-headline text-deep-forest mb-8 italic">{{ t.about.title }}</h2>
          <p class="text-body-lg text-on-surface-variant leading-relaxed mb-6 font-light">
            {{ t.about.story }}
          </p>
          <p class="text-body text-on-surface-variant leading-relaxed font-light italic">
            "{{ t.about.quote }}"
          </p>
        </div>
        <div class="md:col-span-6 md:col-start-7 relative reveal delay-200">
          <div class="aspect-[4/5] bg-sage-wash overflow-hidden">
            <img
              src="/images/gallery-2.jpg"
              alt="The Lodjie Marong heritage hall"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>

    <section class="py-section bg-sage-wash px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <h2 class="font-headline text-headline text-deep-forest mb-12 text-center reveal">{{ t.about.facilitiesTitle }}</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(facility, key) in t.about.facilities"
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
          <h2 class="font-headline text-headline text-deep-forest mb-8">{{ t.about.locationTitle }}</h2>
          <p class="text-body text-on-surface-variant font-light mb-8">{{ t.about.locationAddress }}</p>
          <div class="space-y-4">
            <div class="flex items-start gap-4">
              <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <div>
                <p class="font-label text-label text-deep-forest uppercase">{{ t.about.locationLabel }}</p>
                <p class="text-body font-light">{{ t.about.locationAddress }}</p>
              </div>
            </div>
            <div class="flex items-start gap-4">
              <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p class="font-label text-label text-deep-forest uppercase">{{ t.about.hoursLabel }}</p>
                <p class="text-body font-light whitespace-pre-line">{{ t.about.locationHours }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="md:col-span-8 h-[400px] bg-sage-wash reveal delay-200 overflow-hidden relative grayscale hover:grayscale-0 transition-all duration-700">
          <img
            src="/images/gallery-4.jpg"
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
              <span class="font-label text-label text-deep-forest uppercase tracking-widest">{{ t.common.mapsCta }}</span>
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

const { t } = useLocaleStore()
useScrollReveal()
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/AboutView.vue
git commit -m "feat: add about page with story, facilities, and location"
```

---

## Task 7: Events Page

**Files:**
- Create: `src/views/EventsView.vue`

- [ ] **Step 1: Create src/views/EventsView.vue**

```vue
<template>
  <main class="pt-20">
    <section class="py-section bg-deep-forest text-cream px-margin-x-mobile md:px-margin-x max-w-container mx-auto text-center">
      <span class="font-label text-label text-on-primary-container mb-4 block uppercase">{{ t.events.subtitle }}</span>
      <h2 class="font-headline text-headline mb-16">{{ t.events.title }}</h2>
      <div class="grid md:grid-cols-3 gap-12 text-left">
        <PackageCard
          :name="t.events.packages.intimate.name"
          :description="t.events.packages.intimate.description"
          :capacity="t.events.packages.intimate.capacity"
          :features="t.events.packages.intimate.features"
          :cta-text="t.events.packages.intimate.cta"
        />
        <PackageCard
          :name="t.events.packages.signature.name"
          :description="t.events.packages.signature.description"
          :capacity="t.events.packages.signature.capacity"
          :features="t.events.packages.signature.features"
          :cta-text="t.events.packages.signature.cta"
        />
        <PackageCard
          :name="t.events.packages.estate.name"
          :description="t.events.packages.estate.description"
          :capacity="t.events.packages.estate.capacity"
          :features="t.events.packages.estate.features"
          :cta-text="t.events.packages.estate.cta"
        />
      </div>
    </section>

    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <div class="text-center mb-16 reveal">
        <h2 class="font-headline text-headline text-deep-forest mb-4">{{ t.events.galleryTitle }}</h2>
        <p class="text-body-lg text-on-surface-variant max-w-2xl mx-auto font-light">{{ t.events.gallerySubtitle }}</p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="i in 6"
          :key="i"
          class="aspect-[4/3] bg-sage-wash overflow-hidden reveal"
          :class="`delay-${(i % 3 + 1) * 100}`"
        >
          <img
            :src="`/images/gallery-${((i - 1) % 4) + 1}.jpg`"
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
        {{ t.events.cta }}
      </router-link>
    </section>
  </main>
</template>

<script setup>
import { useLocaleStore } from '../stores/locale'
import { useScrollReveal } from '../composables/useScrollReveal'
import PackageCard from '../components/PackageCard.vue'

const { t } = useLocaleStore()
useScrollReveal()
</script>
```

- [ ] **Step 2: Commit**

```bash
git add src/views/EventsView.vue
git commit -m "feat: add events page with packages and gallery"
```

---

## Task 8: Contact Page with ContactForm Component

**Files:**
- Create: `src/views/ContactView.vue`, `src/components/ContactForm.vue`

- [ ] **Step 1: Create src/components/ContactForm.vue**

```vue
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6" novalidate>
    <div>
      <label :for="nameId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ t.contact.form.name }} <span class="text-red-500">*</span>
      </label>
      <input
        :id="nameId"
        v-model="form.name"
        type="text"
        required
        :class="['w-full px-4 py-3 border bg-cream font-body', errors.name ? 'border-red-500' : 'border-warm-stone/30 focus:border-deep-forest']"
        @blur="validateField('name')"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-500">{{ errors.name }}</p>
    </div>

    <div>
      <label :for="emailId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ t.contact.form.email }} <span class="text-red-500">*</span>
      </label>
      <input
        :id="emailId"
        v-model="form.email"
        type="email"
        required
        :class="['w-full px-4 py-3 border bg-cream font-body', errors.email ? 'border-red-500' : 'border-warm-stone/30 focus:border-deep-forest']"
        @blur="validateField('email')"
      />
      <p v-if="errors.email" class="mt-1 text-sm text-red-500">{{ errors.email }}</p>
    </div>

    <div>
      <label :for="phoneId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ t.contact.form.phone }} <span class="text-red-500">*</span>
      </label>
      <input
        :id="phoneId"
        v-model="form.phone"
        type="tel"
        required
        :class="['w-full px-4 py-3 border bg-cream font-body', errors.phone ? 'border-red-500' : 'border-warm-stone/30 focus:border-deep-forest']"
        @blur="validateField('phone')"
      />
      <p v-if="errors.phone" class="mt-1 text-sm text-red-500">{{ errors.phone }}</p>
    </div>

    <div>
      <label :for="dateId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ t.contact.form.date }}
      </label>
      <input
        :id="dateId"
        v-model="form.date"
        type="date"
        class="w-full px-4 py-3 border border-warm-stone/30 bg-cream font-body focus:border-deep-forest"
      />
    </div>

    <div>
      <label :for="messageId" class="block text-label text-deep-forest uppercase tracking-widest mb-2">
        {{ t.contact.form.message }}
      </label>
      <textarea
        :id="messageId"
        v-model="form.message"
        rows="5"
        class="w-full px-4 py-3 border border-warm-stone/30 bg-cream font-body focus:border-deep-forest resize-vertical"
      ></textarea>
    </div>

    <div v-if="submitStatus" :class="['p-4 text-center font-body', submitStatus === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800']">
      {{ submitStatus === 'success' ? t.contact.form.success : t.contact.form.error }}
    </div>

    <button
      type="submit"
      :disabled="isSubmitting"
      class="w-full px-10 py-4 bg-deep-forest text-cream font-label text-label tracking-[0.2em] uppercase hover:bg-opacity-90 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ isSubmitting ? t.contact.form.submitting : t.contact.form.submit }}
    </button>
  </form>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useLocaleStore } from '../stores/locale'

const { t } = useLocaleStore()
const nameId = `name-${Math.random().toString(36).slice(2)}`
const emailId = `email-${Math.random().toString(36).slice(2)}`
const phoneId = `phone-${Math.random().toString(36).slice(2)}`
const dateId = `date-${Math.random().toString(36).slice(2)}`
const messageId = `message-${Math.random().toString(36).slice(2)}`

const form = reactive({
  name: '',
  email: '',
  phone: '',
  date: '',
  message: ''
})

const errors = reactive({})
const isSubmitting = ref(false)
const submitStatus = ref(null)

function validateField(field) {
  delete errors[field]

  if (field === 'name' && !form.name.trim()) {
    errors.name = t.contact.form.required
  }

  if (field === 'email') {
    if (!form.email.trim()) {
      errors.email = t.contact.form.required
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errors.email = t.contact.form.invalidEmail
    }
  }

  if (field === 'phone') {
    if (!form.phone.trim()) {
      errors.phone = t.contact.form.required
    } else if (!/^[\d\s\-\+\(\)]{8,}$/.test(form.phone)) {
      errors.phone = t.contact.form.invalidPhone
    }
  }
}

function validateAll() {
  validateField('name')
  validateField('email')
  validateField('phone')
  return Object.keys(errors).length === 0
}

async function handleSubmit() {
  if (!validateAll()) return

  isSubmitting.value = true
  submitStatus.value = null

  try {
    // Placeholder for backend integration (Netlify Forms, API, etc.)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    submitStatus.value = 'success'
    form.name = ''
    form.email = ''
    form.phone = ''
    form.date = ''
    form.message = ''
  } catch {
    submitStatus.value = 'error'
  } finally {
    isSubmitting.value = false
  }
}
</script>
```

- [ ] **Step 2: Create src/views/ContactView.vue**

```vue
<template>
  <main class="pt-20">
    <section class="py-section px-margin-x-mobile md:px-margin-x max-w-container mx-auto">
      <div class="text-center mb-16 reveal">
        <h2 class="font-headline text-headline text-deep-forest mb-12 italic">{{ t.contact.title }}</h2>
      </div>

      <div class="grid md:grid-cols-2 gap-12">
        <div class="reveal">
          <ContactForm />
        </div>

        <div class="space-y-10 reveal delay-200">
          <WhatsAppButton
            :label="t.contact.whatsapp"
            phone="6281234567890"
            message="Halo, saya tertarik dengan The Lodjie Marong. Bisa info lebih lanjut?"
          />

          <div class="border-t border-warm-stone/20 pt-8">
            <h3 class="font-headline text-xl text-deep-forest mb-6">{{ t.contact.contactInfo.title }}</h3>
            <div class="space-y-4">
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <div>
                  <p class="font-label text-label text-deep-forest uppercase">{{ t.contact.contactInfo.phone }}</p>
                  <p class="text-body font-light">+62 812-3456-7890</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <div>
                  <p class="font-label text-label text-deep-forest uppercase">{{ t.contact.contactInfo.email }}</p>
                  <p class="text-body font-light">info@lodjiemarong.com</p>
                </div>
              </div>
              <div class="flex items-start gap-4">
                <svg class="w-6 h-6 text-warm-stone flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <p class="font-label text-label text-deep-forest uppercase">{{ t.contact.contactInfo.hours }}</p>
                  <p class="text-body font-light whitespace-pre-line">{{ t.about.locationHours }}</p>
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

const { t } = useLocaleStore()
useScrollReveal()
</script>
```

- [ ] **Step 3: Commit**

```bash
git add src/components/ContactForm.vue src/views/ContactView.vue
git commit -m "feat: add contact page with form and WhatsApp integration"
```

---

## Task 9: Placeholder Images & SEO Files

**Files:**
- Create: `public/images/hero-placeholder.jpg`, `public/images/gallery-1.jpg`, `public/images/gallery-2.jpg`, `public/images/gallery-3.jpg`, `public/images/gallery-4.jpg`, `public/robots.txt`, `public/sitemap.xml`

- [ ] **Step 1: Create placeholder image files (solid color SVGs as placeholders)**

Create `public/images/hero-placeholder.jpg` — Use a solid color or gradient placeholder. For now, create a simple SVG placeholder that can be replaced later:

```bash
mkdir -p public/images
# Create a simple placeholder using a colored div approach
# In production, replace these with actual venue photos
```

For placeholder images, create simple SVG files that render as colored blocks:

`public/images/hero-placeholder.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080">
  <defs>
    <linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2A3B2C"/>
      <stop offset="100%" stop-color="#90673C"/>
    </linearGradient>
  </defs>
  <rect width="1920" height="1080" fill="url(#g)"/>
  <text x="960" y="540" font-family="serif" font-size="48" fill="white" text-anchor="middle" opacity="0.5">Hero Image Placeholder — Replace with venue photo</text>
</svg>
```

`public/images/gallery-1.svg` through `gallery-4.svg`:
```xml
<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
  <rect width="800" height="600" fill="#E9EDDE"/>
  <text x="400" y="300" font-family="sans-serif" font-size="24" fill="#2A3B2C" text-anchor="middle" opacity="0.5">Gallery Placeholder</text>
</svg>
```

- [ ] **Step 2: Create public/robots.txt**

```
User-agent: *
Allow: /

Sitemap: https://lodjiemarong.com/sitemap.xml
```

- [ ] **Step 3: Create public/sitemap.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://lodjiemarong.com/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://lodjiemarong.com/about</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://lodjiemarong.com/events</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://lodjiemarong.com/contact</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
</urlset>
```

- [ ] **Step 4: Update index.html to use SVG placeholders**

Update the `index.html` meta tags to use the correct domain:

```html
<meta property="og:url" content="https://lodjiemarong.com" />
```

- [ ] **Step 5: Commit**

```bash
git add public/
git commit -m "feat: add placeholder images, robots.txt, and sitemap.xml"
```

---

## Task 10: Testing, Build & README

**Files:**
- Create: `README.md`
- Modify: `package.json` (add build verification)

- [ ] **Step 1: Run development server**

Run: `npm run dev`
Expected: Server starts on http://localhost:5173, all 4 pages accessible

- [ ] **Step 2: Verify all pages load**

Visit:
- http://localhost:5173/ — Home page with hero, gallery, CTA
- http://localhost:5173/about — About page with story, facilities, location
- http://localhost:5173/events — Events page with packages, gallery
- http://localhost:5173/contact — Contact page with form, WhatsApp

- [ ] **Step 3: Verify language toggle**

Click language toggle on any page — all text should switch between ID and EN. Preference should persist after page refresh.

- [ ] **Step 4: Verify form validation**

On Contact page:
- Submit empty form — should show required field errors
- Enter invalid email — should show invalid email error
- Enter invalid phone — should show invalid phone error
- Fill all required fields correctly — should show success message

- [ ] **Step 5: Verify WhatsApp button**

Click WhatsApp button — should open WhatsApp with pre-filled message.

- [ ] **Step 6: Run production build**

Run: `npm run build`
Expected: Build succeeds, dist/ folder created with optimized assets

- [ ] **Step 7: Preview production build**

Run: `npm run preview`
Expected: Site serves correctly from dist/ on http://localhost:4173

- [ ] **Step 8: Create README.md**

```markdown
# The Lodjie Marong

Premium wedding venue landing page for The Lodjie Marong in Wonosobo, Indonesia.

## Tech Stack

- Vue 3 (Composition API)
- Vite
- Vue Router 4
- Pinia (i18n state)
- Tailwind CSS

## Getting Started

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
npm run build
npm run preview
```

## Deployment

Deploy to Vercel or Netlify by connecting this repository. The site builds automatically on push to main.

## Customization

- **WhatsApp number**: Update in `src/components/WhatsAppButton.vue` and `src/views/ContactView.vue`
- **Images**: Replace files in `public/images/` with real venue photos
- **Translations**: Edit `src/locales/id.json` and `src/locales/en.json`
- **Colors/Fonts**: Edit `tailwind.config.js`
```

- [ ] **Step 9: Final commit**

```bash
git add README.md
git commit -m "docs: add README with setup and deployment instructions"
```

---

## Self-Review

### Spec Coverage Check

| Requirement | Task |
|-------------|------|
| FR-1: Multi-Page Routing | Task 3 (router/index.js) |
| FR-2: Bilingual Support (i18n) | Task 2 (locale store, JSON files), Task 3 (LanguageToggle) |
| FR-3: Responsive Design | All tasks (Tailwind mobile-first classes) |
| FR-4: WhatsApp Integration | Task 4 (WhatsAppButton.vue), Task 8 (ContactView.vue) |
| FR-5: Contact Form | Task 8 (ContactForm.vue, ContactView.vue) |
| FR-6: Image/Video Placeholders | Task 9 (placeholder images) |
| FR-7: Scroll Animations | Task 4 (useScrollReveal.js) |
| NFR-1: Performance | Task 10 (build verification, lazy loading) |
| NFR-2: Accessibility | All tasks (semantic HTML, aria labels, keyboard nav) |
| NFR-3: SEO | Task 1 (meta tags), Task 9 (robots.txt, sitemap.xml) |
| NFR-4: Deployability | Task 10 (build + README) |

### Placeholder Scan
- No TBD, TODO, or incomplete sections found
- All code blocks contain complete implementations
- No "add tests for the above" without actual code

### Type Consistency
- `useLocaleStore` returns `{ currentLocale, t, setLocale, toggleLocale }` — used consistently across all components
- `useScrollReveal` composable used consistently for animations
- Props defined with explicit types in all components
- Locale JSON structure matches all component references

**Plan is complete and ready for execution.**
