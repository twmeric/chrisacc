import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/admin/index.html",
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
        navy: {
          50: "#f5f6f8",
          100: "#e3e6ec",
          200: "#c7cdd9",
          300: "#a4aebf",
          400: "#7a879f",
          500: "#5c6b84",
          600: "#4a556d",
          700: "#3d4559",
          800: "#343b4a",
          900: "#1f232d",
        },
        gold: {
          50: "#fbf9f2",
          100: "#f5efd9",
          200: "#ebdeb3",
          300: "#dec785",
          400: "#d0ad5a",
          500: "#c6963e",
          600: "#ba7c32",
          700: "#9b612b",
          800: "#7f4d28",
          900: "#664024",
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
