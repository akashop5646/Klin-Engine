export const luxuryTheme = {
  metadata: {
    id: "theme_luxury",
    name: "Luxury",
    version: "1.0.0",
    author: "Klin Team",
    description: "Elegant luxury preset theme",
    supportsDarkMode: true,
    preview: { primary: "#d4af37", background: "#0a0a0a" },
  },
  foundation: {
    colors: {
      gold: "#d4af37",
      darkGold: "#aa8c2c",
      black: "#0a0a0a",
      darkGray: "#1a1a1a",
      white: "#ffffff",
    },
    fontSizes: {
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
    },
    spacing: {
      sm: "0.5rem",
      md: "1rem",
      lg: "1.5rem",
    },
    radius: {
      sm: "0px",
      md: "0px",
      lg: "0px",
    },
  },
  semantic: {
    brand: {
      primary: "gold",
      secondary: "darkGold",
    },
    surface: {
      background: "black",
      card: "darkGray",
    },
    text: {
      primary: "white",
      muted: "gold",
    },
    border: {
      default: "darkGray",
    },
    interaction: {
      hover: "darkGold",
    },
  },
};
