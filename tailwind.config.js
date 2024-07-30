/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
     "./js/**/*.js"
    ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-pattern': "url('img/bg-music.jpg')",
      },
    },
  },
  plugins: [],
}
