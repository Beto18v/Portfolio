/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "electric-blue": "#00CFFF", // Azul eléctrico más brillante
        "neon-cyan": "#00FFEF", // Cian neón más intenso
        "plasma-purple": "#BF00FF", // Morado plasma más vivo
        "dark-gray": "#181818",
        "cool-white": "#F8F8FF",
        "vibrant-pink": "#FF00FF", // Añadimos un rosa vibrante
        "bright-green": "#00FF00", // Añadimos un verde brillante
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        lexend: ["Lexend", "sans-serif"],
      },
    },
  },
  plugins: [],
};
