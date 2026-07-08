import type { Registry } from "@klin/registry";
import type { ThemeEngine } from "@klin/theme";
import type { AssetManager } from "@klin/pages";
import { RendererManager } from "./RendererManager";
import { PluginManager } from "../plugins/PluginManager";
import { RendererFactory } from "./RendererFactory";
import { RenderTarget } from "../contracts/RenderTarget";

export class RendererKernel {
  readonly manager: RendererManager;
  readonly pluginManager: PluginManager;
  private factory = new RendererFactory();

  constructor() {
    this.manager = new RendererManager();
    this.pluginManager = new PluginManager(
      (this.manager as any).registry,
      this.manager.getMiddlewareRegistry(),
      this.manager.getPipeline()
    );
  }

  async bootstrap(registry: Registry, themeEngine: ThemeEngine, assetManager: AssetManager): Promise<void> {
    // 1. Initialize default renderers
    this.manager.register(this.factory.createRenderer(RenderTarget.React));
    this.manager.register(this.factory.createRenderer(RenderTarget.HTML));
    this.manager.register(this.factory.createRenderer(RenderTarget.Email));
    this.manager.register(this.factory.createRenderer(RenderTarget.PDF));
    this.manager.register(this.factory.createRenderer(RenderTarget.Native));

    // 2. Load themes or variables context if necessary
    await themeEngine.initialize();
    await registry.initialize();
  }
}
