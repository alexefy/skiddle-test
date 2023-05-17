import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#46C3BD'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
