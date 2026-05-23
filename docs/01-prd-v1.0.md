# PRD: The Lodjie Marong — Wedding Venue Landing Page

**Version:** 1.0  
**Date:** 2026-05-23  
**Status:** Approved  
**Target Launch:** June 20, 2026  

---

## 1. Executive Summary

The Lodjie Marong is a premium wedding venue located in Wonosobo, Indonesia. This project builds a 4-page bilingual (Bahasa Indonesia / English) landing page that serves as:

1. **Booking gateway** — direct contact path via WhatsApp and embedded form
2. **Portfolio showcase** — visual proof of venue quality through gallery and event packages
3. **Brand presence** — establishes trust and premium positioning in the local wedding market

The site uses Vue 3 + Vite + Tailwind CSS for a lightweight, fast-loading experience deployable on Vercel or Netlify.

---

## 2. Problem Statement

**Current state:** No digital presence for The Lodjie Marong venue. Potential couples have no way to discover the venue, view its offerings, or contact the admin online.

**Impact:** Lost bookings, reliance on word-of-mouth only, no professional portfolio to build trust with premium clients.

**Solution:** A clean, elegant landing page that showcases the venue, presents event packages, and provides clear contact paths — all in a premium aesthetic that matches the venue's positioning.

---

## 3. Goals & Success Metrics

| Goal | Metric |
|------|--------|
| Establish digital presence | Site live and accessible by June 20, 2026 |
| Generate inquiries | WhatsApp clicks + form submissions tracked |
| Showcase venue quality | Gallery loads fast, images optimized |
| Build trust | Professional design, clear package info, contact accessibility |
| Support bilingual audience | Language toggle works, all content translated |

---

## 4. User Personas

### Primary: Local Indonesian Couples (Premium Segment)
- **Age:** 25-40
- **Location:** Wonosobo and surrounding Central Java area
- **Language:** Bahasa Indonesia primary, some English
- **Behavior:** Research venues online, value visual proof, contact via WhatsApp
- **Needs:** Clear pricing, beautiful photos, easy contact, trust signals

### Secondary: Event Planners / Family Decision Makers
- **Role:** Parents, wedding organizers
- **Behavior:** Compare multiple venues, look for capacity and facilities info
- **Needs:** Package details, facility list, location accessibility

---

## 5. Page Specifications

### 5.1 Home (`/`)

**Purpose:** First impression, emotional hook, quick navigation

**Sections:**
1. **Hero** — Full-screen background image/video placeholder, venue tagline, CTA button
2. **Quick Gallery Preview** — 3-4 horizontal scroll images showcasing venue spaces
3. **Value Proposition** — Short text about what makes The Lodjie Marong special
4. **CTA Section** — "Jelajahi Venue" / "Explore Venue" button → About page

**Key Content (Bahasa Indonesia default):**
- Tagline: "Tempat Pernikahan Impian Anda" / "Your Dream Wedding Venue"
- CTA: "Jelajahi Venue" / "Explore Venue"

### 5.2 About (`/about`)

**Purpose:** Build trust, tell the venue story, showcase facilities

**Sections:**
1. **Venue Story** — Heritage, history, what makes it special
2. **Facilities** — Garden, hall, bridal suite, parking, catering area, etc.
3. **Location** — Wonosobo address, directions, embedded map placeholder
4. **Testimonial/Quote** — Owner or past client quote (placeholder)

**Key Content:**
- Address: Wonosobo, Central Java, Indonesia
- Facilities list with icons/descriptions

### 5.3 Events (`/events`)

**Purpose:** Showcase packages and past events

**Sections:**
1. **Package Tiers** — 3 packages with name, description, capacity, included features
   - *Intimate* — Up to 40 guests
   - *Signature* — Up to 150 guests
   - *Estate* — Up to 300 guests (exclusive hire)
2. **Photo Gallery** — Grid of past event photos (placeholder images)
3. **CTA** — "Pesan Sekarang" / "Book Now" → Contact page

**Package Details (per tier):**
- Package name
- Guest capacity
- Description
- Included features (bullet list)
- "Tanya Admin" / "Ask Admin" button → WhatsApp with pre-filled message

### 5.4 Contact (`/contact`)

**Purpose:** Convert visitors into inquiries

**Sections:**
1. **Contact Form** (embedded)
   - Fields: Nama/Name, Email, Telepon/Phone, Tanggal Acara/Event Date, Pesan/Message
   - Client-side validation
   - Ready for backend integration (Netlify Forms or API endpoint)
2. **WhatsApp Button**
   - Redirects to WhatsApp with pre-filled message
   - Format: `https://wa.me/[PHONE]?text=[PREFILLED_MESSAGE]`
3. **Admin Contact Info**
   - Phone number, email, working hours
4. **Social Media Links**
   - Instagram, Facebook, Pinterest

---

## 6. Functional Requirements

### FR-1: Multi-Page Routing
- Vue Router handles 4 pages: `/`, `/about`, `/events`, `/contact`
- Smooth page transitions
- Active nav state highlights current page

### FR-2: Bilingual Support (i18n)
- Language toggle in navbar (ID/EN)
- All text content translated via JSON files
- Default language: Bahasa Indonesia
- Language preference persists via localStorage

### FR-3: Responsive Design
- Mobile-first approach
- Breakpoints: mobile (< 768px), tablet (768-1024px), desktop (> 1024px)
- Hamburger menu on mobile

### FR-4: WhatsApp Integration
- WhatsApp button redirects to `wa.me/[PHONE]` with pre-filled inquiry message
- Pre-filled message includes: venue name, inquiry type
- Configurable phone number via environment variable or config file

### FR-5: Contact Form
- Embedded form on Contact page
- Fields: Name, Email, Phone, Event Date, Message
- Client-side validation (required fields, email format, phone format)
- Form submission ready for backend (Netlify Forms or custom API)
- Success/error states after submission

### FR-6: Image/Video Placeholders
- All media uses placeholder images initially
- Clear file structure for easy replacement with real photos/videos
- Video support in hero section (background video or embedded)

### FR-7: Scroll Animations
- Scroll-reveal animations for sections
- Smooth scroll behavior for anchor links
- Subtle, non-distracting transitions

---

## 7. Non-Functional Requirements

### NFR-1: Performance
- Page load < 2 seconds on 3G
- Lighthouse score > 90 for Performance, Accessibility, Best Practices, SEO
- Images optimized (WebP format, lazy loading)

### NFR-2: Accessibility
- WCAG 2.1 AA compliance
- Proper alt text for images
- Keyboard navigation support
- Sufficient color contrast

### NFR-3: SEO
- Meta tags per page (title, description, Open Graph)
- Semantic HTML structure
- Sitemap.xml generated
- Robots.txt configured

### NFR-4: Deployability
- Deployable on Vercel or Netlify
- Auto-deploy on git push to main branch
- Custom domain support
- Free SSL certificate

---

## 8. Technical Architecture

### Stack
| Component | Technology |
|-----------|------------|
| Framework | Vue 3 (Composition API, `<script setup>`) |
| Build Tool | Vite |
| Routing | Vue Router 4 |
| State Management | Pinia (for i18n state) |
| Styling | Tailwind CSS |
| Fonts | EB Garamond (headings), Inter (body) |
| Deployment | Vercel or Netlify |

### Project Structure
```
lodjie-marong/
├── public/
│   ├── favicon.ico
│   └── images/          # Placeholder images
├── src/
│   ├── assets/
│   │   └── styles/      # Global CSS
│   ├── components/
│   │   ├── Navbar.vue
│   │   ├── Footer.vue
│   │   ├── LanguageToggle.vue
│   │   ├── HeroSection.vue
│   │   ├── GallerySection.vue
│   │   ├── PackageCard.vue
│   │   ├── ContactForm.vue
│   │   └── WhatsAppButton.vue
│   ├── locales/
│   │   ├── id.json
│   │   └── en.json
│   ├── router/
│   │   └── index.js
│   ├── stores/
│   │   └── locale.js
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── AboutView.vue
│   │   ├── EventsView.vue
│   │   └── ContactView.vue
│   ├── App.vue
│   └── main.js
├── index.html
├── vite.config.js
├── tailwind.config.js
├── package.json
└── README.md
```

---

## 9. Data Model

### i18n JSON Structure
```json
{
  "nav": {
    "home": "Beranda",
    "about": "Tentang",
    "events": "Acara",
    "contact": "Kontak"
  },
  "home": {
    "tagline": "Tempat Pernikahan Impian Anda",
    "cta": "Jelajahi Venue"
  },
  "about": {
    "title": "Tentang The Lodjie Marong",
    "story": "...",
    "facilities": [...]
  },
  "events": {
    "title": "Paket Acara",
    "packages": {
      "intimate": { ... },
      "signature": { ... },
      "estate": { ... }
    }
  },
  "contact": {
    "title": "Hubungi Kami",
    "form": { ... },
    "whatsapp": "Chat via WhatsApp"
  }
}
```

---

## 10. UI/UX Flow

### User Journey
1. **Landing** → User arrives at Home page, sees hero + gallery preview
2. **Explore** → User navigates to About to learn more about venue
3. **Evaluate** → User checks Events page for packages and past events
4. **Convert** → User goes to Contact page, fills form or clicks WhatsApp

### Key Interactions
- Language toggle instantly switches all text
- WhatsApp button opens WhatsApp app with pre-filled message
- Form validates on submit, shows success/error state
- Smooth scroll for anchor links within pages

---

## 11. Acceptance Criteria

### AC-1: All 4 pages render correctly on mobile, tablet, and desktop
### AC-2: Language toggle switches all content between ID and EN
### AC-3: WhatsApp button redirects with pre-filled message
### AC-4: Contact form validates and shows success/error states
### AC-5: All images use placeholders, easily replaceable
### AC-6: Site deploys successfully on Vercel or Netlify
### AC-7: Lighthouse scores > 90 on all metrics
### AC-8: Navigation works correctly with active state highlighting

---

## 12. Out of Scope

- Backend form processing (form ready for integration, but no backend built)
- CMS integration (content managed via code for now)
- Booking calendar or availability checker
- Payment processing
- Blog or news section
- User accounts or login

---

## 13. Dependencies & Risks

| Risk | Impact | Mitigation |
|------|--------|------------|
| Real media not ready by launch | Medium | Use high-quality placeholders, easy swap structure |
| WhatsApp number changes | Low | Configurable via environment variable |
| Form backend not ready | Low | Form validates client-side, ready for Netlify Forms or API |
| Design not approved by stakeholder | Medium | Use design reference as baseline, iterate based on feedback |

---

## 14. Timeline & Milestones

| Phase | Duration | Target Date |
|-------|----------|-------------|
| Project Setup & Architecture | 2 days | May 25 |
| Core Pages (Home, About) | 3 days | May 28 |
| Events & Contact Pages | 3 days | May 31 |
| i18n & Language Toggle | 2 days | June 2 |
| Styling & Polish | 3 days | June 5 |
| Testing & QA | 2 days | June 7 |
| Deployment & Launch | 1 day | June 8 |
| Buffer | 12 days | June 20 |

**Total:** ~16 working days + 12 days buffer = **Launch by June 20, 2026**

---

## 15. Appendices

### A. Design Reference
- Based on provided `docs/design/design-referance.html`
- Color palette: Deep Forest Green (`#2A3B2C`), Cream (`#FDFBF7`), Warm Stone (`#90673C`), Sage Wash (`#E9EDDE`)
- Fonts: EB Garamond (headings), Inter (body)
- Style: Heritage luxury, old-money aesthetic, editorial feel

### B. Competitor Analysis
- Local wedding venues in Wonosobo typically have minimal or no web presence
- Premium venues in larger cities (Jakarta, Bandung) use similar landing page structures
- Differentiator: Bilingual support, professional design, clear package presentation

### C. Glossary
| Term | Definition |
|------|------------|
| i18n | Internationalization — supporting multiple languages |
| CTA | Call to Action — button or link prompting user action |
| Hero | Full-screen top section of landing page |
| Package Tier | Pricing/offer level for venue rental |

---

**End of PRD v1.0**
