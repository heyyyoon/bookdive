/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{jsx,js}"],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0px 0px 10px 5px rgba(0,0,0,0.5);',
        'custom' : '0px 0px 5px 3px rgba(0,0,0,0.5);',
        'customBook' : '0px 0px 5px 3px rgba(0,0,0,0.3);',
        'modal' : '0 35px 60px -15px rgba(0,0,0,0.5);',
      }, 
      maxWidth: {
        'basic': '72rem'
      },
      screens: {
        'custom-2': '550px',
        'custom-3': '768px',
        'custom-4': '1024px',
      },
      padding: {
        'top-basic': '3rem',
        'result' : '2.5rem',
      },
      colors: {
        'darkgrey': '#27272a',      // text-zinc-800
        'medigrey' : '#3f3f46',     // text-zinc-700
        'lightgrey' : '#a1a1aa',    // text-zinc-400
        'warning': '#2563eb',
        'success': '#ea580c', 
      },
      fontSize: {
        'content': '0.8rem',
        'title': '0.95rem',
      },
      animation: {
        fade: 'fadeIn 0.5s ease-in-out',
        rltTop: 'rltTop linear 0.2s',
      },
      backgroundImage: {
        banner: `url('../public/images/bada.jpg')`,
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1'},
        },
        rltTop: {
          '0%': { transform: 'translate(-50%, -25%) scale(1)', opacity: '0' },
          '100%': { transform: 'translate(-50%, 0%) scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
