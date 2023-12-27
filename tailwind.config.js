/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ec4e20',
        secondary: '#ff9505',
        black: '#1a1a1a',
        white: '#f9f9f9',
      },
      maxWidth: {
        default: '1280px',
      },
      height: {
        'screen-header': 'calc(100vh - 90px)',
      },
      minHeight: {
        'screen-header': 'calc(100vh - 90px)',
      },
      borderRadius: {
        small: '8px',
        medium: '18px',
      },
    },
  },
  plugins: [],
}

