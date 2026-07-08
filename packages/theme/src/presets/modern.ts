export const modernTheme = {
  metadata: {
    id: "theme_modern",
    name: "Modern",
    version: "1.0.0",
    author: "Klin Team",
    description: "Sleek modern preset theme",
    supportsDarkMode: true,
    preview: { primary: "#6366f1", background: "#f8fafc" },
  },
  foundation: {
    colors: {
      indigo: "#6366f1",
      indigoDark: "#4f46e5",
      slateLight: "#f8fafc",
      slateDark: "#0f172a",
      slateMuted: "#64748b",
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
      sm: "6px",
      md: "12px",
      lg: "18px",
    },
  },
  semantic: {
    brand: {
      primary: "indigo",
      secondary: "indigoDark",
    },
    surface: {
      background: "slateLight",
      card: "white",
    },
    text: {
      primary: "slateDark",
      muted: "slateMuted",
    },
    border: {
      default: "slateLight",
    },
    interaction: {
      hover: "indigoDark",
    },
  },
};
