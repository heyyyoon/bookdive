/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 10px 5px rgba(0,0,0,0.5);',
        'custom' : '0px 0px 5px 3px rgba(0,0,0,0.5);',
        'customBook' : '0px 0px 10px 3px rgba(0,0,0,0.5);',
      },
      colors: {
      },
      fontFamily: {
        sans: ['Cute Font', 'sans-serif'],
      },
      backgroundImage: {
       
      },
    },
  },
  plugins: [],
}
