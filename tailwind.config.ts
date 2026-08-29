import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./sanity/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          cream: "#F2E7DA",
          "gray-light": "#E5E5E5",
          "gray-muted": "#9F9A96",
          "champagne-dark": "#7F6753",
          champagne: "#A08E7C",
          "champagne-light": "#C7B8AA",
        },
      },
      backgroundImage: {
        "champagne-gradient":
          "linear-gradient(90deg, #7F6753 0%, #A08E7C 50%, #C7B8AA 100%)",
      },
      fontFamily: {
        sans: ["var(--font-neue-haas)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
