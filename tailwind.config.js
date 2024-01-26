/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./pages/**/*.vue`,
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#0F172A",
        "secondary": "#1f3056"
      }
      // backgroundColor: {
      //   "primary": "#6ddf97",
      //   "secondary": "#A1EEBD"
      // },
      // colors: {
      //   "primary": "#6ddf97",
      //   "secondary": "#A1EEBD"
      // },
      // textColor: {
      //   "primary": "#6ddf97",
      //   "secondary": "#A1EEBD"
      // }
    },
  },
  plugins: [],
}