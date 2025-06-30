/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // Define Inter font
      },
      colors: {
        primary: '#1A535C', // Dark Teal
        secondary: '#4ECDC4', // Light Teal/Turquoise
        accent: '#F7B731', // Gold/Yellow
        background: '#F0F0F0', // Light Grey
        text: '#333333', // Dark Grey for text
        success: '#28A745', // Green for success
        warning: '#FFC107', // Orange for warning
        danger: '#DC3545', // Red for danger
      }
    },
  },
  plugins: [],
}