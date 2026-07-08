import type { RenderTree } from "@klin/pages";
import type { ThemeContext } from "@klin/theme";
import type { Registry } from "@klin/registry";
import type { EventBus } from "@klin/event-bus";
import type { AssetManager } from "@klin/pages";
import type { RendererOptions } from "../contracts/RendererOptions";
import type { RenderTarget } from "../contracts/RenderTarget";

export interface RendererContext {
  renderTree: RenderTree;
  themeContext: ThemeContext;
  registry: Registry;
  eventBus?: EventBus;
  assetManager?: AssetManager;
  options: RendererOptions;
  target: RenderTarget;
  locale: string;
  viewport: {
    width: number;
    height: number;
    type: "desktop" | "tablet" | "mobile" | "print";
  };
}
