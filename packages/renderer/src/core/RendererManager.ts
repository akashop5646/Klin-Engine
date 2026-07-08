import type { IRenderer } from "./IRenderer";
import type { RendererContext } from "./RendererContext";
import type { RenderTree } from "@klin/pages";
import type { RenderResult } from "../contracts/RenderResult";
import { RendererRegistry } from "../registry/RendererRegistry";
import { MiddlewareRegistry } from "../middleware/MiddlewareRegistry";
import { RendererPipeline } from "../pipeline/RendererPipeline";
import { RenderCache } from "../optimization/RenderCache";
import { RenderTreeHasher } from "../optimization/RenderTreeHasher";
import { Result, Ok, Err } from "@klin/core";

export class RendererManager {
  private registry = new RendererRegistry();
  private middlewareRegistry = new MiddlewareRegistry();
  private pipeline = new RendererPipeline();
  private cache = new RenderCache();
  private hasher = new RenderTreeHasher();

  register(renderer: IRenderer): void {
    this.registry.registerRenderer(renderer);
  }

  unregister(id: string): void {
    this.registry.removeRenderer(id);
  }

  get(id: string): IRenderer | undefined {
    return this.registry.findRenderer(id);
  }

  list(): IRenderer[] {
    return this.registry.list();
  }

  getMiddlewareRegistry(): MiddlewareRegistry {
    return this.middlewareRegistry;
  }

  getPipeline(): RendererPipeline {
    return this.pipeline;
  }

  async render(tree: RenderTree, context: RendererContext): Promise<Result<RenderResult, Error>> {
    const startTime = Date.now();

    // 1. Run middlewears
    const midRes = await this.middlewareRegistry.run(tree, context);
    if (!midRes.ok) {
      return new Err(midRes.error);
    }
    const { tree: processedTree, context: processedCtx } = midRes.value;

    // 2. Check Cache
    const hash = this.hasher.hash(processedTree);
    const cached = this.cache.get(hash);
    if (cached) {
      return new Ok(cached);
    }

    // 3. Resolve target platform renderer
    const renderer = this.registry.findRenderer(processedCtx.target);
    if (!renderer) {
      return new Err(new Error(`No renderer supporting target platform: ${processedCtx.target}`));
    }

    try {
      // 4. Render
      const renderRes = await renderer.render(processedTree, processedCtx);
      
      const duration = Date.now() - startTime;
      const finalResult: RenderResult = {
        ...renderRes,
        duration,
        metadata: {
          ...renderRes.metadata,
          cached: false,
          hash,
        },
      };

      // 5. Store Cache if successful
      if (finalResult.success) {
        this.cache.set(hash, finalResult);
      }

      return new Ok(finalResult);
    } catch (err) {
      return new Err(err as Error);
    }
  }

  destroy(): void {
    this.cache.clear();
  }
}
