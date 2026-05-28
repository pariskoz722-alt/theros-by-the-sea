import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        sand: '#F2EBD9',
        'sand-dark': '#E8DCC4',
        terracotta: '#C4714A',
        'terracotta-dark': '#9E4E2A',
        ivory: '#FAF6EE',
        'text-dark': '#2C1F14',
        'text-mid': '#6B4B35',
        'text-light': '#A0806A',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Jost', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
