/**
 * @klin/ui/button — Public API
 *
 * Every UI package exports exactly the same surface:
 *   Component, render, schema, defaults, variants, tokens, metadata, preview, manifest
 */

// Component
export { Button } from "./core/Button";
export { renderButtonHTML } from "./core/render";

// Config
export { buttonSchema } from "./config/schema";
export { buttonDefaults } from "./config/defaults";
export type { ButtonProps } from "./config/defaults";
export { ButtonVariant, ButtonSize, ButtonShape } from "./config/variants";
export type { ButtonVariantType, ButtonSizeType, ButtonShapeType } from "./config/variants";
export { buttonTokens } from "./config/tokens";
export { buttonMetadata } from "./config/metadata";
export { buttonBuilderConfig } from "./config/builder";

// Runtime
export { validateButtonProps } from "./runtime/validation";
export { getAriaAttributes, validateTouchTarget, prefersReducedMotion } from "./runtime/accessibility";
export { getAnimationStyle, buttonKeyframes } from "./runtime/animations";
export type { AnimationPreset } from "./runtime/animations";
export { ButtonHookManager } from "./runtime/hooks";
export type { ButtonComponentHooks } from "./runtime/hooks";

// Preview
export { buttonPreviewConfig } from "./preview/preview";

// Styles
export { getButtonStyles, getButtonHoverStyles, getButtonActiveStyles, getButtonFocusStyles } from "./styles/styles";
