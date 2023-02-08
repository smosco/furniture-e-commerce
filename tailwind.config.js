/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "ore-red": "#f05b47",
        "ore-color": "#00FF7F",
        "ore-black": "#17171b",
        "ore-button": "#222532",
        "ore-brand": "#007B01",
      },
      backgroundImage: {
        banner: `url("./images/banner1.jpg")`,
      },
    },
  },
  plugins: [],
};
