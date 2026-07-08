/**
 * Button Preview — preview configuration for the Builder palette.
 * Defines thumbnail, default props, search keywords, and example variants.
 */

import type { ButtonProps } from "../config/defaults";
import { buttonDefaults } from "../config/defaults";

export interface PreviewExample {
  label: string;
  props: Partial<ButtonProps>;
}

export interface PreviewConfig {
  /** Component thumbnail reference */
  thumbnail: string;

  /** Default props for preview rendering */
  defaultProps: ButtonProps;

  /** Categories for palette grouping */
  categories: string[];

  /** Search keywords */
  keywords: string[];

  /** Layout hint for the palette */
  previewLayout: "inline" | "block" | "grid";

  /** Example variant configurations shown in the preview panel */
  examples: PreviewExample[];
}

export const buttonPreviewConfig: PreviewConfig = {
  thumbnail: "assets/button-preview.png",
  defaultProps: buttonDefaults,
  categories: ["Atoms", "Actions"],
  keywords: ["button", "btn", "action", "click", "submit", "cta"],
  previewLayout: "inline",
  examples: [
    { label: "Primary", props: { variant: "primary", text: "Primary" } },
    { label: "Secondary", props: { variant: "secondary", text: "Secondary" } },
    { label: "Outline", props: { variant: "outline", text: "Outline" } },
    { label: "Ghost", props: { variant: "ghost", text: "Ghost" } },
    { label: "Link", props: { variant: "link", text: "Link" } },
    { label: "Success", props: { variant: "success", text: "Success" } },
    { label: "Warning", props: { variant: "warning", text: "Warning" } },
    { label: "Danger", props: { variant: "danger", text: "Danger" } },
    { label: "Loading", props: { variant: "primary", text: "Loading", loading: true } },
    { label: "Disabled", props: { variant: "primary", text: "Disabled", disabled: true } },
    { label: "Full Width", props: { variant: "primary", text: "Full Width", fullWidth: true } },
    { label: "Pill", props: { variant: "primary", text: "Pill", shape: "pill" } },
    { label: "Small", props: { variant: "primary", text: "Small", size: "sm" } },
    { label: "Extra Large", props: { variant: "primary", text: "Extra Large", size: "xl" } },
  ],
};
