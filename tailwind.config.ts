import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'simpsons-yellow': '#FFD90F',
        'simpsons-blue': '#70D1FE',
      },
    },
  },
  plugins: [],
};
export default config;
