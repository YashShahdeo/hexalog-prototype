/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        brand: {
          purple: '#4B2492',
          deep: '#26124D',
          darkest: '#0E0023',
          violet: '#9460D9',
          mauve: '#744C8A',
        },
        navy: {
          DEFAULT: '#161A2E',
          light: '#1E2440',
          border: '#2A3153',
        },
        success: '#2E9E5B',
        danger: '#D64545',
        soft: {
          red: '#F4777F',
          yellow: '#FFD728',
          lavender: '#F4F0FB',
          lavender2: '#EEE3F4',
        },
        ink: {
          900: '#17141F',
          600: '#5B5768',
          400: '#9B97A8',
        },
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 3px rgba(14,0,35,0.06), 0 4px 16px rgba(14,0,35,0.06)',
        elevated: '0 4px 12px rgba(14,0,35,0.08), 0 12px 32px rgba(14,0,35,0.10)',
      },
      borderRadius: {
        card: '10px',
      },
      keyframes: {
        fadeSlideIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        checkPop: {
          '0%': { opacity: '0', transform: 'scale(0.6)' },
          '60%': { transform: 'scale(1.15)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      animation: {
        fadeSlideIn: 'fadeSlideIn 0.3s ease-out both',
        checkPop: 'checkPop 0.35s ease-out both',
      },
    },
  },
  plugins: [],
}
