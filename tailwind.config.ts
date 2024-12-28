import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      keyframes:{
        fadeup: {
          "0%": { opacity: '1', transform: "translateY(0)" },
          "100%": { opacity: '0', transform: "translateY(-100px)" },
        }
      },
      animation: {
        fadeup: "fadeup 1s ease-out",
      },
    },
    
  },
  plugins: [require("@xpd/tailwind-3dtransforms")],
};
export default config;
