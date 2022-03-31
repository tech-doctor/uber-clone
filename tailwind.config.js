const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
         'light-gray': "rgb(240, 240, 240)", 
        transparent: "transparent",
        current: "currentColor",
        primary: {
          superlight: "#FFFFFF",
          light: "#FFF8F0",
          DEFAULT: "#FFEBD1",
          dark: "#978F85"
        },
        secondary: {
          light: "#EFEFEF",
          DEFAULT: "#A0A0A0",
          dark: "#26221D"
        }
      }
      
    },
    //   colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor'  
    // }
    },
    variants: {
      extend: {},
    },
    plugins: [
      require('@tailwindcss/forms'), // import tailwind forms
   ],
}
