/** @type {import('tailwindcss').Config} */
export default {
  content: [  './app/**/*.{js,jsx,ts,tsx}', // Ensure app folder content is included
    './pages/**/*.{js,jsx,ts,tsx}', // If you also have any pages directory
    './components/**/*.{js,jsx,ts,tsx}',],
  theme: {
    extend: {},
  },
  plugins: [],
}

