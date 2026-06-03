import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#3ECF8E",
          dark: "#249361",
        },
      },
    },
  },
  plugins: [],
};

export default config;
