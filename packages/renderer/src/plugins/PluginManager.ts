import type { RendererPlugin } from "./RendererPlugin";
import type { RendererRegistry } from "../registry/RendererRegistry";
import type { MiddlewareRegistry } from "../middleware/MiddlewareRegistry";
import type { RendererPipeline } from "../pipeline/RendererPipeline";

export class PluginManager {
  private plugins: Map<string, RendererPlugin> = new Map();
  private rendererRegistry: RendererRegistry;
  private middlewareRegistry: MiddlewareRegistry;
  private pipeline: RendererPipeline;

  constructor(
    rendererRegistry: RendererRegistry,
    middlewareRegistry: MiddlewareRegistry,
    pipeline: RendererPipeline
  ) {
    this.rendererRegistry = rendererRegistry;
    this.middlewareRegistry = middlewareRegistry;
    this.pipeline = pipeline;
  }

  register(plugin: RendererPlugin): void {
    if (this.plugins.has(plugin.id)) {
      return;
    }
    this.plugins.set(plugin.id, plugin);

    // Apply middleware registrations
    if (plugin.registerMiddleware) {
      const middlewares = plugin.registerMiddleware();
      for (const m of middlewares) {
        this.middlewareRegistry.register(m);
      }
    }

    // Apply renderer registrations
    if (plugin.registerRenderer) {
      const renderers = plugin.registerRenderer();
      for (const r of renderers) {
        this.rendererRegistry.registerRenderer(r);
      }
    }

    // Apply pipeline stages
    if (plugin.registerPipelineStage) {
      const stages = plugin.registerPipelineStage();
      for (const s of stages) {
        this.pipeline.addStage(s);
      }
    }
  }

  unregister(id: string): void {
    const plugin = this.plugins.get(id);
    if (!plugin) return;

    if (plugin.registerMiddleware) {
      const middlewares = plugin.registerMiddleware();
      for (const m of middlewares) {
        this.middlewareRegistry.unregister(m.id);
      }
    }

    if (plugin.registerRenderer) {
      const renderers = plugin.registerRenderer();
      for (const r of renderers) {
        this.rendererRegistry.removeRenderer(r.id);
      }
    }

    if (plugin.registerPipelineStage) {
      const stages = plugin.registerPipelineStage();
      for (const s of stages) {
        this.pipeline.getRegistry().unregister(s.id);
      }
    }

    this.plugins.delete(id);
  }

  getPlugins(): RendererPlugin[] {
    return Array.from(this.plugins.values());
  }
}
