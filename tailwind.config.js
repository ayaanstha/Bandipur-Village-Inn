/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: { 50: '#FDFBF7', DEFAULT: '#F8F3EA', 200: '#F0E6D4' },
        sand: { DEFAULT: '#E6D7BE', 300: '#D9C6A5', 500: '#A8916D' },
        terracotta: { 400: '#C9714A', DEFAULT: '#B4532A', 600: '#9A4320' },
        brick: { DEFAULT: '#8B2E20', 700: '#6E2318' },
        forest: { DEFAULT: '#2E4636', 800: '#24372A', 900: '#1A2820' },
        umber: { 600: '#5A4433', 700: '#4A3626', 800: '#3A281C', DEFAULT: '#2A1C13', 950: '#1C120C' },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"Manrope Variable"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: { eyebrow: '0.28em' },
      maxWidth: { site: '1320px' },
      keyframes: {
        'hero-zoom': { from: { transform: 'scale(1.08)' }, to: { transform: 'scale(1)' } },
        'fade-up': { from: { opacity: 0, transform: 'translateY(18px)' }, to: { opacity: 1, transform: 'none' } },
      },
      animation: {
        'hero-zoom': 'hero-zoom 2.4s cubic-bezier(.2,.7,.2,1) both',
        'fade-up': 'fade-up 1s cubic-bezier(.2,.7,.2,1) both',
      },
    },
  },
  plugins: [],
};
