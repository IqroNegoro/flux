/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    `./components/**/*.{vue,js,ts}`,
    `./pages/**/*.vue`,
  ],
  theme: {
    extend: {
      backgroundColor: {
        "primary": "#0F172A",
        "secondary": "#1f3056"
      },
      colors: {
        "primary": "#0F172A",
        "secondary": "#1f3056"
      },
      textColor: {
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