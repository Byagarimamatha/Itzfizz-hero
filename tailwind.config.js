/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        track: "#d1d1d1",
        road: "#1e1e1e",
        trail: "#45db7d",
        statLime: "#def54f",
        statDark: "#2c2c2c",
        statBlue: "#6ac9ff",
        statOrange: "#fa7328",
      },
      fontFamily: {
        display: ["var(--font-display)", "Arial Black", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};