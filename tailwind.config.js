module.exports = {
  mode: 'jit',
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        themePink :'#F9DBE0'
      },
      backgroundImage: {
        'registerImg': "url('https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940')"
      },
      flex: {
        '3': '3 3 0%',
        '2' : '2 2 0%'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
