/**
 * Button Variants — structured variant system for the Button component.
 */

export const ButtonVariant = {
  Primary: "primary",
  Secondary: "secondary",
  Outline: "outline",
  Ghost: "ghost",
  Link: "link",
  Success: "success",
  Warning: "warning",
  Danger: "danger",
} as const;

export type ButtonVariantType = (typeof ButtonVariant)[keyof typeof ButtonVariant];

export const ButtonSize = {
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
  XL: "xl",
} as const;

export type ButtonSizeType = (typeof ButtonSize)[keyof typeof ButtonSize];

export const ButtonShape = {
  Square: "square",
  Rounded: "rounded",
  Pill: "pill",
} as const;

export type ButtonShapeType = (typeof ButtonShape)[keyof typeof ButtonShape];
