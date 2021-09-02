const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: [
    './pages/**/*.js',
    './components/**/*.js'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      ...defaultTheme.colors,
      orange: {
        50: '#fcefe9',
        100: '#faded3',
        200: '#f5bda7',
        300: '#ef9d7b',
        400: '#ea7c4f',
        500: '#e55b23',
        600: '#ce5220',
        700: '#b7491c',
        800: '#a04019',
        900: '#893715',
      }
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
