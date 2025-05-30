module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,html,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          orange: "var(--primary-orange)",
          black: "var(--primary-black)",
          white: "var(--primary-white)",
          gray: "var(--primary-gray)",
        },
        secondary: {
          gray: "var(--secondary-gray)",
          darkGray: "var(--secondary-dark-gray)",
          lightGray: "var(--secondary-light-gray)",
          inputBorder: "var(--secondary-input-border)",
        },
        border: {
          gray: "var(--border-gray)",
          black: "var(--border-black)",
          light: "var(--border-light)",
          input: "var(--border-input)",
        },
        shadow: {
          gray: "var(--shadow-gray)",
        },
      },
      fontFamily: {
        'plus-jakarta': ['"Plus Jakarta Sans"', 'sans-serif'],
        'lexend': ['Lexend', 'sans-serif'],
        dancing: ['"Dancing Script"', 'cursive'],
      },
    },
  },
  plugins: [],
};