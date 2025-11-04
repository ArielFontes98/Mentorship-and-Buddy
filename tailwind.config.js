/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#820AD1',
          50: '#f5e6ff',
          100: '#e9ccff',
          200: '#d9aaff',
          300: '#c77dff',
          400: '#b14aff',
          500: '#820AD1',
          600: '#7a0db8',
          700: '#6a0b9e',
          800: '#5a0a84',
          900: '#4a096a',
        },
      },
    },
  },
  plugins: [],
}

