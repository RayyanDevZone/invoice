/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Add Montserrat font here
        raleway: ['Roboto', 'sans-serif'], // Add Roboto font here
        lexend: ['Lexend', 'sans-serif'] // Add Lexend font here
      },
      // Add custom utility for hiding spinners
      addUtilities: {
        '.no-spinners': {
          '::-webkit-outer-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0',
          },
          '::-webkit-inner-spin-button': {
            '-webkit-appearance': 'none',
            'margin': '0',
          },
          // For Firefox
          'appearance': 'textfield',
        },
      },
    },
  },
  plugins: [],
}
