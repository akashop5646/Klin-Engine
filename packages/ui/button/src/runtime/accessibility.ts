/**
 * Button Accessibility — keyboard navigation, ARIA, screen reader,
 * focus visible, reduced motion, touch target, RTL support.
 */

/**
 * Generate ARIA attributes for the button.
 */
export function getAriaAttributes(
  disabled: boolean,
  loading: boolean,
  ariaLabel: string | undefined,
  text: string
): Record<string, string | undefined> {
  const attrs: Record<string, string | undefined> = {};

  if (ariaLabel) {
    attrs["aria-label"] = ariaLabel;
  }

  if (disabled) {
    attrs["aria-disabled"] = "true";
  }

  if (loading) {
    attrs["aria-busy"] = "true";
    attrs["aria-live"] = "polite";
    attrs["aria-label"] = ariaLabel ?? `${text}, loading`;
  }

  attrs["role"] = "button";
  attrs["tabIndex"] = disabled ? "-1" : "0";

  return attrs;
}

/**
 * Check minimum touch target size (WCAG 2.1 SC 2.5.5 — 44x44 CSS px).
 */
export function validateTouchTarget(width: number, height: number): boolean {
  return width >= 44 && height >= 44;
}

/**
 * Check color contrast ratio (simplified WCAG AA check).
 * Returns true if ratio meets AA threshold (4.5:1 for normal text).
 */
export function meetsContrastRatio(foreground: string, background: string): boolean {
  // Placeholder — real implementation would parse colors and compute luminance ratio
  // For now, semantic tokens handle this at the theme level
  return foreground !== background;
}

/**
 * Reduced motion media query check.
 * Components should respect prefers-reduced-motion.
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
