export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  border?: string;
  muted?: string;
}

export interface ThemeTypography {
  headingFont: string;
  bodyFont: string;
  headingSize: "small" | "default" | "large";
  bodySize: "small" | "default" | "large";
}

export interface ThemeButtons {
  style: "rounded" | "square" | "pill";
  shadow: boolean;
}

export interface ThemeCards {
  radius: number;
  shadow: boolean;
  border: boolean;
}

export type AnimationPreset =
  | "none"
  | "fade"
  | "slide"
  | "scale"
  | "luxury"
  | "modern";

export interface ThemeConfig {
  colors: ThemeColors;
  typography: ThemeTypography;
  buttons: ThemeButtons;
  cards: ThemeCards;
  animations: AnimationPreset;
}

export interface ThemeResolverResult {
  cssVariables: Record<string, string>;
  tailwindClasses: string[];
}
