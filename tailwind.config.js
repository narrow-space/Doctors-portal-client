/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}', './node_modules/tw-elements/dist/js/**/*.js'],
  darkMode: 'class',
  theme: {
    
    extend: {
     
    },
  },
  //...
  daisyui: {
    themes: [
      {
        doctortheme: {
          accent: "#0FCFEC",
          secondary: "#19D3AE",
          primary: "#3A4256",
          neutral: "#3d4451",
          
          "base-100": "#ffffff",
        },
      },
      "night","winter","halloween","synthwave","black","light","aqua"
    ],
  },
  plugins: [require("daisyui"), require('tw-elements/dist/plugin')],
}
