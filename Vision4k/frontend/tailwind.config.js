module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0f172a",
        secondary: "#1e293b",
        accent: "#7c3aed",
        neon: "#00f0ff",
      },
      animation: {
        "border-spin": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
