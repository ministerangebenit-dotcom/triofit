/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#C79B45', light: '#D9AE5A' },
        bg: { dark: '#0B0B0D', light: '#FAF9F7' }
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        sans: ['-apple-system', 'system-ui', 'sans-serif']
      },
      maxWidth: { app: '720px' }
    },
  },
  plugins: [],
};
