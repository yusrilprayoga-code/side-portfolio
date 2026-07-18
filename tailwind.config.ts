import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Semantic tokens — flip automatically in .dark via CSS variables.
        bg: "var(--c-bg)",
        fg: "var(--c-fg)",
        muted: "var(--c-muted)",
        line: "var(--c-line)",
        soft: "var(--c-soft)",
        accent: {
          DEFAULT: "var(--c-accent)",
          ink: "var(--c-accent-ink)",
        },
        // Legacy aliases used by not-yet-migrated components.
        primary: "var(--c-fg)",
        secondary: "var(--c-muted)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        editorial: [
          "var(--font-editorial)",
          "Didot",
          "Bodoni MT",
          "serif",
        ],
        display: [
          "var(--font-display)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "var(--font-mono)",
          "ui-monospace",
          "SFMono-Regular",
          "monospace",
        ],
      },
      boxShadow: {
        // Hard offset "shadow" — a brutalist border, not a blur.
        brutal: "4px 4px 0 0 var(--c-line)",
        "brutal-lg": "8px 8px 0 0 var(--c-line)",
        "brutal-accent": "4px 4px 0 0 var(--c-accent)",
      },
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
      },
      keyframes: {
        scroll: {
          to: {
            transform: "translate(calc(-50% - 0.5rem))",
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), addVariablesForColors],
  darkMode: "class",
} satisfies Config;

// This plugin adds each Tailwind color as a global CSS variable, e.g. var(--gray-200).
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );

  addBase({
    ":root": newVars,
  });
}

export default config;
