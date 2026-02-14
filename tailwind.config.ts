import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", 
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        fluentGlass: "rgba(255, 255, 255, 0.2)", 
        fluentGlassDark: "rgba(15, 23, 42, 0.8)",
      },
      backdropBlur: {
        xs: "2px",
      }
    },
  },
  // שימוש ב-import במקום require למניעת שגיאות בילד
  plugins: [
    require("tailwindcss-animate"),
    require("tailwindcss-rtl"),
  ],
};

export default config;
