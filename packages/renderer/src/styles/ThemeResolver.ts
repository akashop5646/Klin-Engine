import type { RendererContext } from "../core/RendererContext";
import { ThemeEngine } from "@klin/theme";

export class ThemeResolver {
  private themeEngine = new ThemeEngine();

  async resolveThemeCss(themeId: string, context: RendererContext): Promise<string> {
    try {
      const themeVal = await context.registry.resolve("theme", themeId);
      if (!themeVal) {
        return "/* Fallback: theme not found */";
      }
      const css = await this.themeEngine.compile(themeVal);
      return css;
    } catch (err) {
      console.error(`ThemeResolver failed to resolve theme [${themeId}]:`, err);
      return "";
    }
  }
}
