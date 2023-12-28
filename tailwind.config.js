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
        tertiary: '#fcf0dc',
        orange: '#382717',
        black: '#1a1a1a',
        white: '#f9f9f9',
      },
      maxWidth: {
        default: '1280px',
      },
      height: {
        'screen-header': 'calc(100vh - 75px)',
      },
      minHeight: {
        'screen-header': 'calc(100vh - 75px)',
      },
      borderRadius: {
        small: '8px',
        medium: '18px',
      },
      gridTemplateColumns: {
        'header': '170px 1fr 170px',
        'list': 'repeat(auto-fill, minmax(200px, 1fr))',
      },
    },
  },
  plugins: [],
}

