/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        'm': '2px 2px 0px 1px rgba(0 0 0)',
        'xl': '5px 5px 0px 1px rgba(0 0 0)',
      },
      fontFamily: {
        Inria: "'Inria Sans'",
        Lilita: "'Lilita One'",
      },
      colors: {
        primary: 'rgb(140, 255, 251)',
        secondary: 'rgb(132, 71, 255)',
      },
    },
  },
  plugins: [],
}
