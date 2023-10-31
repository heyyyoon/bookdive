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
      maxWidth: {
        'basic': '72rem'
      },
      padding: {
        'top-basic': '4rem',
        'result' : '2.5rem',
      },
      colors: {
        'darkgrey': '#27272a',
        'lightgrey' : '#3f3f46',
      },
      fontSize: {
        'content': '0.8rem',
        'title': '0.95rem',
      },
      screens: {
        'xs' : '550px',
      }
    },
  },
  plugins: [],
}
