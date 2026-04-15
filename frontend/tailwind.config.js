/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#a78bfa',
          500: '#7c3aed',
          600: '#6d28d9',
        },
        accent: {
          400: '#f472b6',
          500: '#db2777',
        },
        dark: {
          900: '#07070e',
          800: '#0d0d18',
          700: '#111120',
          600: '#1a1a2e',
          500: '#1e1e40',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
