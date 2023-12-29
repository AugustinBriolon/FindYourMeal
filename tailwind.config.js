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
        "primary-dark": '#9D3010',
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
        'list-header': 'calc(100vh - 120px)',
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
        'items': 'repeat(auto-fill, minmax(100px, 1fr))',
        'list': 'repeat(auto-fill, minmax(150px, 1fr))',
      },
      darkMode: 'class',
    },
  },
  plugins: [],
}

