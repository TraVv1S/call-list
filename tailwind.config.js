/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "text-secondary": "var(--text-secondary)",
        "text-green": "var(--text-green)",
        "ui-green": "var(--ui-green)",
        "ui-light-green": "var(--ui-light-green)",
        "ui-red": "var(--ui-red)",
        "ui-light-red": "var(--ui-light-red)",
        "ui-secondary": "var(--ui-secondary)",
        "ui-icon": "var(--ui-icon)",
        "ui-blue": "var(--ui-blue)",
        "ui-border": "var(--ui-border)",
      },
    },
  },
  plugins: [],
};
