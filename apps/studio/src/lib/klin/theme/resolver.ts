import { ThemeConfig, ThemeResolverResult } from "../types/theme";
import { DEFAULT_THEME_TOKENS } from "./tokens";

export class KlinThemeResolver {
  /**
   * Resolves a Klin theme configuration into CSS Custom Properties (Variables)
   * and Tailwind class lists suitable for application.
   */
  public resolve(theme: ThemeConfig): ThemeResolverResult {
    const cssVariables: Record<string, string> = {
      "--klin-color-primary": theme.colors.primary,
      "--klin-color-secondary": theme.colors.secondary,
      "--klin-color-accent": theme.colors.accent,
      "--klin-color-background": theme.colors.background,
      "--klin-color-surface": theme.colors.surface,
      "--klin-color-text": theme.colors.text,
      "--klin-color-border": theme.colors.border || "oklch(0.92 0.01 0)",
      "--klin-color-muted": theme.colors.muted || "oklch(0.6 0.02 0)",

      // Typography Font Families
      "--klin-font-heading": `"${theme.typography.headingFont}", sans-serif`,
      "--klin-font-body": `"${theme.typography.bodyFont}", sans-serif`,

      // Shapes & Cards Layout
      "--klin-card-radius": `${theme.cards.radius}px`,
      "--klin-card-shadow": theme.cards.shadow ? "0 4px 20px rgba(0,0,0,0.08)" : "none",
      "--klin-card-border": theme.cards.border ? "1px solid var(--klin-color-border)" : "none",

      // Animation timings based on preset choice
      "--klin-transition-ease": DEFAULT_THEME_TOKENS.easing.outExpo,
      "--klin-transition-duration":
        theme.animations === "luxury"
          ? DEFAULT_THEME_TOKENS.duration.slower
          : theme.animations === "fade"
          ? DEFAULT_THEME_TOKENS.duration.fast
          : DEFAULT_THEME_TOKENS.duration.normal,
    };

    // Compose custom classes based on options
    const tailwindClasses: string[] = [
      `font-${theme.typography.bodyFont.toLowerCase().replace(/\s+/g, "-")}`,
      theme.buttons.style === "pill" ? "rounded-full" : theme.buttons.style === "square" ? "rounded-none" : "rounded-lg",
    ];

    if (theme.buttons.shadow) {
      tailwindClasses.push("shadow-sm");
    }

    return {
      cssVariables,
      tailwindClasses,
    };
  }

  /**
   * Applies the CSS variables to an HTML document or a specific element node.
   */
  public applyToDom(theme: ThemeConfig, element: HTMLElement = document.documentElement): void {
    const { cssVariables } = this.resolve(theme);
    for (const [key, val] of Object.entries(cssVariables)) {
      element.style.setProperty(key, val);
    }
  }
}

export const themeResolver = new KlinThemeResolver();
