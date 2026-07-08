/**
 * Button Styles — CSS-in-JS style generation consuming var(--klin-*) CSS custom properties.
 * Zero hardcoded hex values. All colors resolve through the Theme Engine.
 */

import type { ButtonVariantType, ButtonSizeType, ButtonShapeType } from "../config/variants";
import { buttonTokens } from "../config/tokens";

const sizeMap: Record<string, { fontSize: string; padding: string; minHeight: string }> = {
  xs: { fontSize: "0.75rem", padding: "0.25rem 0.5rem", minHeight: "1.5rem" },
  sm: { fontSize: "0.8125rem", padding: "0.375rem 0.75rem", minHeight: "2rem" },
  md: { fontSize: "0.875rem", padding: "0.5rem 1rem", minHeight: "2.5rem" },
  lg: { fontSize: "1rem", padding: "0.625rem 1.25rem", minHeight: "3rem" },
  xl: { fontSize: "1.125rem", padding: "0.75rem 1.5rem", minHeight: "3.5rem" },
};

const shapeMap: Record<string, string> = {
  square: "var(--klin-radius-sm, 0px)",
  rounded: "var(--klin-radius-md, 6px)",
  pill: "9999px",
};

export function getButtonStyles(
  variant: ButtonVariantType,
  size: ButtonSizeType,
  shape: ButtonShapeType,
  fullWidth: boolean,
  disabled: boolean,
  borderRadiusOverride?: string
): Record<string, string> {
  const tokens = buttonTokens[variant] ?? buttonTokens.primary;
  const sizeStyles = sizeMap[size] ?? sizeMap.md;
  const borderRadius = borderRadiusOverride ?? shapeMap[shape] ?? shapeMap.rounded;

  const stateTokens = disabled ? tokens.disabled : tokens.idle;

  return {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5rem",
    border: `1px solid ${stateTokens.border}`,
    borderRadius,
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? "0.6" : "1",
    fontFamily: "inherit",
    fontWeight: "600",
    lineHeight: "1.25",
    textDecoration: "none",
    transition: "all 150ms ease-in-out",
    width: fullWidth ? "100%" : "auto",
    whiteSpace: "nowrap",
    userSelect: "none",
    outline: "none",
    background: stateTokens.background,
    color: stateTokens.text,
    fontSize: sizeStyles.fontSize,
    padding: sizeStyles.padding,
    minHeight: sizeStyles.minHeight,
  };
}

export function getButtonHoverStyles(variant: ButtonVariantType): Record<string, string> {
  const tokens = buttonTokens[variant] ?? buttonTokens.primary;
  return {
    background: tokens.hover.background,
    color: tokens.hover.text,
    borderColor: tokens.hover.border,
  };
}

export function getButtonActiveStyles(variant: ButtonVariantType): Record<string, string> {
  const tokens = buttonTokens[variant] ?? buttonTokens.primary;
  return {
    background: tokens.active.background,
    color: tokens.active.text,
    borderColor: tokens.active.border,
  };
}

export function getButtonFocusStyles(variant: ButtonVariantType): Record<string, string> {
  const tokens = buttonTokens[variant] ?? buttonTokens.primary;
  return {
    outline: "none",
    boxShadow: `0 0 0 3px ${tokens.focus.ring}40`,
  };
}
