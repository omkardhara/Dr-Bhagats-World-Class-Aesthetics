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
          // Body copy on light backgrounds. brand-gray-muted is 2.79:1 on
          // white, below WCAG AA; this is the same hue darkened to 4.54:1.
          // gray-muted stays as specified and is still used on dark grounds,
          // where it measures 7.54:1.
          "gray-text": "#77716D",
          // Warm page ground. Premium peers (Aman #F3EEE7, Rosewood #FAFBF5)
          // avoid stark white; this is the same move at low intensity, and
          // keeps brand-gray-text above AA at 4.50:1.
          bone: "#FAF7F3",
          "champagne-dark": "#7F6753",
          champagne: "#A08E7C",
          "champagne-light": "#C7B8AA",
        },
      },
      backgroundImage: {
        // Brand gradient. Decorative use only - rules, accents, hairlines.
        "champagne-gradient":
          "linear-gradient(90deg, #7F6753 0%, #A08E7C 50%, #C7B8AA 100%)",
        // Interactive use. The brand gradient reaches 1.93:1 against white
        // text at its light end, well below WCAG AA, so buttons use this
        // deeper range where every stop clears 4.5:1.
        "champagne-gradient-deep":
          "linear-gradient(90deg, #7F6753 0%, #867361 50%, #8B725B 100%)",
      },
      fontFamily: {
        sans: ["var(--font-neue-haas)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
