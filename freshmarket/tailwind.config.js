/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        surface: 'var(--bg-surface)',
        main: 'var(--bg-main)',
        elevated: 'var(--bg-elevated)',
        card: 'var(--bg-card)',
        muted: 'var(--bg-muted)',
        'border-custom': 'var(--border-color)',
        'text-primary': 'var(--text-primary)',
        'text-secondary': 'var(--text-secondary)',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { 'background-position': '-200% 0' },
          '100%': { 'background-position': '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
