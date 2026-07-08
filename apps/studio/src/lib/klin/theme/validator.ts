import { ThemeConfig } from "../types/theme";

export class KlinThemeValidator {
  /**
   * Performs format auditing of a given theme configuration.
   */
  public validate(theme: ThemeConfig): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Verify colors are hex values or oklch formats
    const hexPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    const oklchPattern = /^oklch\(.*\)$/;
    
    for (const [key, colorVal] of Object.entries(theme.colors)) {
      if (typeof colorVal !== "string") {
        errors.push(`Theme color "${key}" must be a string.`);
        continue;
      }
      const isHex = hexPattern.test(colorVal);
      const isOklch = oklchPattern.test(colorVal);
      if (!isHex && !isOklch) {
        errors.push(`Theme color "${key}" value "${colorVal}" is neither a valid hex code nor oklch format.`);
      }
    }

    // Border Radius bounds check
    if (theme.cards.radius < 0 || theme.cards.radius > 50) {
      errors.push(`Card corner radius must be between 0 and 50px. Got: ${theme.cards.radius}`);
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const themeValidator = new KlinThemeValidator();
