const plugin = require('tailwindcss/plugin')

module.exports = {
  mode: 'jit',
  theme: {
    colors: {
      white: '#ffffff',
      black: '#000000',
      red: '#FF3559',
      grey: '#767676',
    },
  },

  plugins: [
    plugin(({ addBase, theme }) => {
      addBase({
        html: {
          color: theme('colors.white'),
          fontFamily: '"Open Sans", sans-serif',
        },
        input: { color: theme('colors.black') },
        select: { color: theme('colors.black') },
      })
    }),
  ],
}
