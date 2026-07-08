export interface FoundationTokens {
  colors: Record<string, string>;
  fontSizes: Record<string, string>;
  spacing: Record<string, string>;
  radius: Record<string, string>;
}

export const defaultFoundationTokens: FoundationTokens = {
  colors: {
    blue500: "#3b82f6",
    blue600: "#2563eb",
    gray100: "#f3f4f6",
    gray900: "#111827",
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
    sm: "0.25rem",
    md: "0.375rem",
    lg: "0.5rem",
  },
};
