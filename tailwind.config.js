/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        emerald: {
          950: '#031E14',
          900: '#062C1E',
          800: '#0A3825',
          700: '#115E3B',
          600: '#15803D',
        },
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
          royal: '#FFD700',
          dark: '#B45309',
        },
        cream: {
          50: '#FFFDF5',
          100: '#FBF6E9',
          200: '#F3EAD3',
          300: '#E5D6B1',
        },
        terracotta: {
          500: '#C85A32',
          600: '#B84A28',
          700: '#9A3918',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'sans-serif'],
        serif: ['Cinzel', 'Playfair Display', 'serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        glowPulse: {
          '0%': { filter: 'drop-shadow(0 0 5px rgba(245, 158, 11, 0.4))' },
          '100%': { filter: 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.9))' },
        }
      }
    },
  },
  plugins: [],
}
