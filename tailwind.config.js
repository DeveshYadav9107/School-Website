/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4FA',
          100: '#D9E3F3',
          200: '#B3C8E7',
          300: '#81A4D6',
          400: '#4F7EC4',
          500: '#2A5BB2',
          600: '#1C428C',
          700: '#15336C',
          800: '#0F2547', // Primary Brand Color
          900: '#0A1830',
          950: '#050D1B',
        },
        gold: {
          50: '#FDFBF4',
          100: '#FAF3DD',
          200: '#F3E4B3',
          300: '#EBD184',
          400: '#E2BC55',
          500: '#D99B26', // Warm Gold Accent
          600: '#BA801C',
          700: '#946316',
          800: '#734A12',
          900: '#52340E',
        }
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      }
    },
  },
  plugins: [],
};
