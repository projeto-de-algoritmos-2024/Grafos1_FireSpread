/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/**/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'background': '#03071E',
        'foreground': '#0B0F26',
        'input': '#1E213A',
        "primaryButton": "#E85D04",
        "secondaryButton": "#FFFFFF",
        "primaryText": "#FFFFFF",
        "secondaryText": "#000000",
        "stroke": "#585858",
        "inputText": "#E0E0E0",
      }
    },
  }, 
  plugins: [],
}