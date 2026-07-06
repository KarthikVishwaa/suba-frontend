/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#38BDF8',
          dark: '#0284C7',
          light: '#E0F2FE',
        },
        surface: '#F8FAFC',
        navy: '#0F172A',
        'body-text': '#64748B',
        success: '#22C55E',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      }
    },
  },
  plugins: [],
}