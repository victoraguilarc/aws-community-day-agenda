import headlessuiPlugin from '@headlessui/tailwindcss'
import { type Config } from 'tailwindcss'

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontSize: {
      xs: ['0.75rem', { lineHeight: '1rem' }],
      sm: ['0.875rem', { lineHeight: '1.5rem' }],
      base: ['1rem', { lineHeight: '1.5rem' }],
      lg: ['1.125rem', { lineHeight: '2rem' }],
      xl: ['1.25rem', { lineHeight: '2rem' }],
      '2xl': ['1.5rem', { lineHeight: '2.5rem' }],
      '3xl': ['2rem', { lineHeight: '2.5rem' }],
      '4xl': ['2.5rem', { lineHeight: '3rem' }],
      '5xl': ['3rem', { lineHeight: '3.5rem' }],
      '6xl': ['4rem', { lineHeight: '1' }],
      '7xl': ['5rem', { lineHeight: '1' }],
      '8xl': ['6rem', { lineHeight: '1' }],
      '9xl': ['8rem', { lineHeight: '1' }],
    },
    extend: {
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      fontFamily: {
        sans: 'var(--font-inter)',
        display: 'var(--font-dm-sans)',
        exo: ['"Exo 2"'],
        poppins: ['Poppins', 'sans-serif'],
      },
      maxWidth: {
        '2xl': '40rem',
        '8xl': '85rem',
      },
      colors: {
        'aws-gray': '#232f3e',
        'aws-pink': '#ff007b',
        'aws-turquoise': '#56C0A7',
        'aws-light-purple': '#C4B5FD',
        'aws-gray-400': '#3B4C5A',
        'aws-purple': '#7928CA',
        'aws-blue': '#00a3ff',
        'aws-yellow': '#FF9900',
      },
    },
  },
  plugins: [headlessuiPlugin],
} satisfies Config
