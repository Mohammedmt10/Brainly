/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        purple : {
          "200" : "#e0e6ff",
          "300" : "#433ab6",
          "400" : "#5046e4"
        },
      },
    },
  },
  plugins: [],
}

