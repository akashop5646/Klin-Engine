/**
 * Button Defaults — default prop values for the Button component.
 */

import type { ButtonVariantType, ButtonSizeType, ButtonShapeType } from "./variants";

export interface ButtonProps {
  /** Button text content */
  text: string;

  /** Visual variant */
  variant: ButtonVariantType;

  /** Size preset */
  size: ButtonSizeType;

  /** Shape preset */
  shape: ButtonShapeType;

  /** Icon identifier (from icon library) */
  icon?: string;

  /** Icon position relative to text */
  iconPosition: "left" | "right";

  /** Whether button shows loading state */
  loading: boolean;

  /** Whether button is disabled */
  disabled: boolean;

  /** Whether button stretches to full container width */
  fullWidth: boolean;

  /** Text alignment within button */
  alignment: "left" | "center" | "right";

  /** Override border radius (CSS value) */
  borderRadiusOverride?: string;

  /** Animation preset name */
  animation: string;

  /** Link URL — renders as anchor when provided */
  linkUrl?: string;

  /** Link target */
  target?: "_self" | "_blank" | "_parent" | "_top";

  /** HTML type attribute */
  type: "button" | "submit" | "reset";

  /** Click handler */
  onClick?: () => void;

  /** Accessible label override */
  ariaLabel?: string;
}

export const buttonDefaults: ButtonProps = {
  text: "Button",
  variant: "primary",
  size: "md",
  shape: "rounded",
  iconPosition: "left",
  loading: false,
  disabled: false,
  fullWidth: false,
  alignment: "center",
  animation: "scale",
  type: "button",
};
