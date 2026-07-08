/**
 * Button Validation — runtime prop validation against the schema.
 */

import type { ButtonProps } from "../config/defaults";
import { ButtonVariant, ButtonSize, ButtonShape } from "../config/variants";

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

const validVariants = new Set(Object.values(ButtonVariant));
const validSizes = new Set(Object.values(ButtonSize));
const validShapes = new Set(Object.values(ButtonShape));

export function validateButtonProps(props: Partial<ButtonProps>): ValidationResult {
  const errors: string[] = [];

  if (props.variant && !validVariants.has(props.variant)) {
    errors.push(`Invalid variant "${props.variant}". Must be one of: ${[...validVariants].join(", ")}`);
  }

  if (props.size && !validSizes.has(props.size)) {
    errors.push(`Invalid size "${props.size}". Must be one of: ${[...validSizes].join(", ")}`);
  }

  if (props.shape && !validShapes.has(props.shape)) {
    errors.push(`Invalid shape "${props.shape}". Must be one of: ${[...validShapes].join(", ")}`);
  }

  if (props.linkUrl && props.disabled) {
    errors.push("A disabled button should not have a linkUrl. The link will be ignored.");
  }

  if (props.text !== undefined && props.text.trim() === "" && !props.ariaLabel && !props.icon) {
    errors.push("Button must have text content, an ariaLabel, or an icon for accessibility.");
  }

  return { valid: errors.length === 0, errors };
}
