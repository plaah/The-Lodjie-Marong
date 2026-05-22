# AGENTS.md — The Lodjie Marong

## Project

Vue 3 + Vite + Tailwind CSS landing page for a wedding venue in Wonosobo, Indonesia.
Bilingual (Bahasa Indonesia default, English toggle). 4 pages: Home, About, Events, Contact.

## Commands

```bash
npm run dev       # dev server (localhost:5173)
npm run build     # production build → dist/
npm run preview   # preview dist/ (localhost:4173)
```

No test, lint, or typecheck configured.

## Architecture

```
src/
  main.js              # entry — creates app, mounts Pinia + Router
  App.vue              # root — Navbar + router-view + Footer
  router/index.js      # 4 routes: /, /about, /events, /contact
  stores/locale.js     # Pinia i18n store (id/en JSON, localStorage persistence)
  composables/         # useScrollReveal.js — IntersectionObserver for .reveal elements
  components/          # shared: Navbar, Footer, LanguageToggle, HeroSection, GallerySection, PackageCard, ContactForm, WhatsAppButton
  views/               # page components: HomeView, AboutView, EventsView, ContactView
  locales/             # id.json, en.json — all translatable strings
  assets/styles/       # main.css — Tailwind directives + .reveal animation classes
```

## Critical Gotchas

### Pinia store destructuring breaks reactivity

**NEVER** destructure computed refs from the locale store:
```js
// ❌ WRONG — loses reactivity, language toggle won't update
const { t } = useLocaleStore()

// ✅ CORRECT — keep store reference
const locale = useLocaleStore()
// template: {{ locale.t.home.title }}
```
This applies to ALL components using `useLocaleStore()`. See `src/stores/locale.js`.

### Dynamic Tailwind classes don't compile

Tailwind scans source for full class strings at build time. Dynamic class construction like `delay-${n}` produces nothing. Use inline `:style="{ transitionDelay: '0.1s' }"` instead.

### Image files are SVG placeholders

All images in `public/images/` are `.svg` placeholders. Replace with real `.jpg`/`.webp` photos later and update references in components accordingly.

### WhatsApp phone number

Configured in `src/components/WhatsAppButton.vue` and `src/views/ContactView.vue` as `6281234567890`. Update both places when real number is known.

### Contact form has no backend

Form validates client-side only. Submission simulates success with `setTimeout`. Ready for Netlify Forms or API integration — add `action`/`method` or fetch call when backend is ready.

## Deployment

Deploy to Vercel or Netlify. Connect repo, auto-builds on push to `main`. Build command: `npm run build`, output: `dist/`.
