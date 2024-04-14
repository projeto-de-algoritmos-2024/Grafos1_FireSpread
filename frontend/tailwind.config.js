/** @type {import('tailwindcss').Config} */
import withMT from '@material-tailwind/react/utils/withMT'


export default withMT( {
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
        "error": "#BF281B",
        "warning": "#F5BD42",
        "success": "#00A896",
      },
      keyframes: {
        slidePlaceholderMd: {
          '0%, 100%': { textIndent: '0' },
          '50%': { textIndent: '-60px' }, // Adjust as needed
        },
        slidePlaceholderSm: {
          '0%, 100%': { textIndent: '0' },
          '50%': { textIndent: '-90px' }, // Adjust as needed
        },
      },
      animation: {
        'slide-placeholder-md': 'slidePlaceholderMd 8s ease-in-out infinite',
        'slide-placeholder-sm': 'slidePlaceholderSm 8s ease-in-out infinite',
        'spin-slow': 'spin 3s linear infinite',
      }
    },
  }, 
  plugins: [],
}
)