/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx,md,mdx}',
    './pages/**/*.{js,jsx,ts,tsx,md,mdx}',
    './theme.config.jsx'
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          400: '#94d17c',
          500: '#81c869',
          600: '#6eb456',
        },
        dark: {
          DEFAULT: '#1a1a1a',
          secondary: '#242424',
          tertiary: '#2a2a2a'
        }
      }
    }
  },
  // Enable JIT mode for better performance
  mode: 'jit',
}
