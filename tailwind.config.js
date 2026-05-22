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
