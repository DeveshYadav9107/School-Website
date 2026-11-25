/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/pages/**/*.{js,jsx,mdx}",
    "./src/components/**/*.{js,jsx,mdx}",
    "./src/app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#EEF3F9',
          100: '#D4E0F0',
          200: '#A9C2E1',
          300: '#769BCE',
          400: '#4973B6',
          500: '#275197',
          600: '#1B3C76',
          700: '#122F5D',
          800: '#0B2545', // Classic Dark Navy Blue Primary Brand Color
          900: '#071A33',
          950: '#041021',
        },
        gold: {
          50: '#FCF9F2',
          100: '#F7EED9',
          200: '#EEDBB2',
          300: '#E3C68A',
          400: '#D4B26C',
          500: '#C5A059', // Antique Gold Accent
          600: '#A8843F',
          700: '#85662D',
          800: '#664D21',
          900: '#473517',
        }
      },
      fontFamily: {
        heading: ['var(--font-jakarta)', 'sans-serif'],
        sans: ['var(--font-inter)', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 0.25s ease-out forwards',
        'slide-left': 'slideLeft 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-up': 'fadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      }
    },
  },
  plugins: [],
};
