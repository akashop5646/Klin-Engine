/**
 * Button Render — standalone render function for server-side or headless
 * rendering without full React context.
 */

import type { ButtonProps } from "../config/defaults";
import { buttonDefaults } from "../config/defaults";
import { getButtonStyles } from "../styles/styles";

/**
 * Renders a button as an HTML string. Useful for SSR, email templates,
 * or headless preview generation.
 */
export function renderButtonHTML(incomingProps?: Partial<ButtonProps>): string {
  const props: ButtonProps = { ...buttonDefaults, ...incomingProps };
  const { text, variant, size, shape, fullWidth, disabled, linkUrl, target, ariaLabel } = props;

  const styles = getButtonStyles(variant, size, shape, fullWidth, disabled);
  const styleString = Object.entries(styles)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, "-$1").toLowerCase();
      return `${cssKey}: ${value}`;
    })
    .join("; ");

  const ariaAttrs = [
    ariaLabel ? `aria-label="${ariaLabel}"` : "",
    disabled ? `aria-disabled="true"` : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (linkUrl && !disabled) {
    const rel = target === "_blank" ? ` rel="noopener noreferrer"` : "";
    return `<a href="${linkUrl}" target="${target ?? "_self"}"${rel} class="klin-button" data-variant="${variant}" data-size="${size}" data-shape="${shape}" style="${styleString}" ${ariaAttrs}><span class="klin-button-text">${text}</span></a>`;
  }

  return `<button type="${props.type}" class="klin-button" data-variant="${variant}" data-size="${size}" data-shape="${shape}"${disabled ? " disabled" : ""} style="${styleString}" ${ariaAttrs}><span class="klin-button-text">${text}</span></button>`;
}
