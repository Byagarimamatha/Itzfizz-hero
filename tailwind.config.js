/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#12102b",
        road: "#1d1b45",
        lilac: "#8e88d9",
        signal: "#ffc93c",
        paper: "#f5f4ff",
      },
      fontFamily: {
        display: ["Unbounded", "Arial Black", "system-ui", "sans-serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};