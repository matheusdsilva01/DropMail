/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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