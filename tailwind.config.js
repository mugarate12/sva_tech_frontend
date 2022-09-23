/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{jsx,tsx}',
    './components/**/*.{jsx,tsx}',
    './containers/**/*.{jsx,tsx}',
    './layouts/**/*.{jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
