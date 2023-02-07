/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: "#f96162",
      },
      backgroundImage: {
        banner: `url("./images/banner.jpg")`,
      },
    },
  },
  plugins: [],
};
