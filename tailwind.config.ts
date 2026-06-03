import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: { DEFAULT: "#3ECF8E", dark: "#249361" },
        ink: { DEFAULT: "#ededed", muted: "#a3a3a3", faint: "#737373" },
        surface: { base: "#181818", panel: "#1e1e1e", raised: "#232323" },
        hairline: { DEFAULT: "#2e2e2e", strong: "#3a3a3a" },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
