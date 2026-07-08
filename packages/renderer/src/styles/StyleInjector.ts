import type { RendererContext } from "../core/RendererContext";
import { RenderTarget } from "../contracts/RenderTarget";

export class StyleInjector {
  injectStyles(css: string, context: RendererContext): string | undefined {
    const target = context.target;

    if (target === RenderTarget.HTML || target === RenderTarget.Email) {
      // Return wrapped style tag for static page exports
      return `<style data-klin-theme>${css}</style>`;
    }

    if (target === RenderTarget.React && typeof document !== "undefined") {
      // Injects into active browser document element
      let styleTag = document.querySelector("style[data-klin-theme]");
      if (!styleTag) {
        styleTag = document.createElement("style");
        styleTag.setAttribute("data-klin-theme", "");
        document.head.appendChild(styleTag);
      }
      styleTag.textContent = css;
    }

    return undefined;
  }
}
