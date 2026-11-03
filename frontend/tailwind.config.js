/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0a0a0f",
        "bg-secondary": "#12121a",
        "accent-orange": "#ff6b35",
        "accent-amber": "#ffb347",
        "accent-green": "#2dd4a8",
        "accent-red": "#ff4757",
        "accent-blue": "#5b9aff",
        "accent-purple": "#a855f7",
        "text-primary": "#f0f0f5",
        "text-secondary": "#9898a8",
        "text-muted": "#606070",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans Thai", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      borderRadius: {
        sm: "8px",
        md: "12px",
        lg: "16px",
        xl: "24px",
        full: "9999px",
      },
      backdropBlur: {
        xs: "4px",
        sm: "15px",
        md: "20px",
        lg: "25px",
        xl: "30px",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease forwards",
      },
    },
  },
  plugins: [],
};
