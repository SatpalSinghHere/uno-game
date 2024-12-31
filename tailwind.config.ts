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
      boxShadow: {
        textoutlinewhite: "0px 0px 0px 2px white",
        textoutlineblack: "0px 0px 0px 2px black",
      },
      keyframes:{
        fadeup: {
          "0%": { opacity: '1', transform: "translate(-30%,-30%)" },
          "30%": { opacity: '1', transform: "translate(-30%,-30%)" },
          // "30%": { opacity: '1', transform: "translate(0,0)" },
          "100%": { opacity: '0', transform: "translate(-30%,-100%)" },
        }
      },
      animation: {
        fadeup: "fadeup 4s ease-out",
      },
    },
    
  },
  plugins: [require("@xpd/tailwind-3dtransforms")],
};
export default config;
