/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      content: {
        'copy': 'url("assets/copy-icon.svg")',
      },
    },
  },
  plugins: [],
}