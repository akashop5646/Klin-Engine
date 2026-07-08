export const SPACING_TOKENS = {
  xs: "0.25rem",  // 4px
  sm: "0.5rem",   // 8px
  md: "1rem",     // 16px
  lg: "1.5rem",   // 24px
  xl: "2rem",     // 32px
  xxl: "3rem",    // 48px
};

export const EASING_TOKENS = {
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  inOutSine: "cubic-bezier(0.37, 0, 0.63, 1)",
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
};

export const DURATION_TOKENS = {
  fast: "150ms",
  normal: "300ms",
  slow: "500ms",
  slower: "700ms",
};

export const DEFAULT_THEME_TOKENS = {
  spacing: SPACING_TOKENS,
  easing: EASING_TOKENS,
  duration: DURATION_TOKENS,
};
