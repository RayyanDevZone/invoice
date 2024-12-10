/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], // Add Montserrat font here
        raleway: ['Roboto', 'sans-serif'], // Add Montserrat font here
        lexend: ['Lexend', 'sans-serif'] // Add Montserrat font here
      },
    },
  },
  plugins: [],
}