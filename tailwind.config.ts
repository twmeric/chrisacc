import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: "#1a3a5c",
          "navy-light": "#2c5282",
          accent: "#3182ce",
          gold: "#c9a227",
          "gold-light": "#d4af37",
          cream: "#f7fafc",
        },
        text: {
          dark: "#2d3748",
          light: "#718096",
        },
      },
      fontFamily: {
        sans: ["Noto Sans TC", "Noto Sans SC", "Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
