/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
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
        primary: 'rgb(0, 254, 255)',
        secondary: 'rgb(255, 0, 255)',
      },
    },
  },
  plugins: [],
}
