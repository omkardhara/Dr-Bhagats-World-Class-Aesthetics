import type { Config } from "tailwindcss";

const config: Config = {
  // No `content` here on purpose. These globs do not match paths containing
  // route-group parentheses, so nothing under app/(site)/ was ever scanned and
  // classes used only in those files were silently dropped from the build.
  // Sources are declared with @source in app/globals.css instead.
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#000000",
          white: "#FFFFFF",
          cream: "#F2E7DA",
          "gray-light": "#E5E5E5",
          // Not in the original brand spec. Added for image placeholders and
          // raised surfaces on brand-black, which need to sit just above pure
          // black to register at all.
          "gray-dark": "#1A1A1A",
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
