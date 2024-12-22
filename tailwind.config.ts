import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        skinRed: "#fa8072",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        impact: ["Impact", "sans-serif"],
      },
    },
  },
  plugins: [],
} satisfies Config;
