/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        bg: "#0a0a0f",
        surface: "#111118",
        card: "#161622",
        border: "#232334",
        muted: "#8b8b9e",
        text: "#e8e8f0",
        primary: {
          DEFAULT: "#e11d48",
          soft: "#f43f5e",
          dark: "#9f1239",
        },
        accent: "#eab308",
      },
      boxShadow: {
        glow: "0 10px 40px -10px rgba(225,29,72,0.45)",
        elevated: "0 20px 60px -20px rgba(0,0,0,0.6)",
      },
      backgroundImage: {
        "gradient-hero":
          "radial-gradient(ellipse at top, rgba(225,29,72,0.18), transparent 55%), radial-gradient(ellipse at bottom right, rgba(234,179,8,0.12), transparent 55%), linear-gradient(180deg,#0a0a0f 0%,#0a0a0f 100%)",
        "gradient-primary": "linear-gradient(135deg,#e11d48 0%,#f43f5e 60%,#eab308 100%)",
      },
    },
  },
  plugins: [],
};
