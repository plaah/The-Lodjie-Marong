# The Lodjie Marong

Premium wedding venue landing page in Wonosobo, Central Java, Indonesia. Showcases a blend of Javanese heritage architecture and modern elegance — wedding gardens, heritage hall, bridal suite, and exclusive service for life's most special day.

Bilingual website (Bahasa Indonesia / English), 4 pages: Home, About, Events, and Contact. Includes an AI chat widget that answers questions about the venue, packages, and facilities — routing inquiries directly to WhatsApp for booking.

## Pages

- **Home** — Hero visual, venue gallery, and core value proposition
- **About** — Heritage story, facilities (garden, hall, suite, parking, catering, audio), and location
- **Events** — Three wedding packages: Intimate (40 guests), Signature (150 guests), Estate (300 guests)
- **Contact** — Inquiry form, WhatsApp contact, and address & business hours

## Tech Stack

Vue 3 + Vite + Vue Router 4 + Pinia + Tailwind CSS

## Getting Started

```bash
npm install
npm run dev      # http://localhost:5173
```

## Build

```bash
npm run build    # output → dist/
npm run preview  # preview build
```

## Deployment

Deploy to Vercel or Netlify — connect the repository, auto-builds on push to `main`. Build command: `npm run build`, output: `dist/`.

## Customization

- **WhatsApp**: Update in `src/components/WhatsAppButton.vue`, `src/components/ContactForm.vue`, `src/views/ContactView.vue`
- **Images**: Replace files in `public/images/` with real venue photos
- **Translations**: Edit `src/locales/id.json` and `src/locales/en.json`
- **Chat AI**: NVIDIA API key in `.env.local`, system prompt at `src/data/system-prompt.js`, knowledge base at `src/data/knowledge-base.json`
