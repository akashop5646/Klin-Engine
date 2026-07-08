import type { RendererMiddleware } from "./RendererMiddleware";
import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import { Result, Ok, Err } from "@klin/core";

export class MiddlewareRegistry {
  private middlewares: RendererMiddleware[] = [];

  register(middleware: RendererMiddleware): void {
    // Avoid duplicates of same middleware id
    this.middlewares = this.middlewares.filter((m) => m.id !== middleware.id);
    this.middlewares.push(middleware);
    // Sort by priority ascending
    this.middlewares.sort((a, b) => a.priority - b.priority);
  }

  unregister(id: string): void {
    this.middlewares = this.middlewares.filter((m) => m.id !== id);
  }

  getMiddlewares(): RendererMiddleware[] {
    return [...this.middlewares];
  }

  async run(
    tree: RenderTree,
    context: RendererContext
  ): Promise<Result<{ tree: RenderTree; context: RendererContext }, Error>> {
    let currentTree = tree;
    let currentContext = context;

    for (const m of this.middlewares) {
      try {
        const res = await m.process(currentTree, currentContext);
        if (!res.ok) {
          return new Err(new Error(`Middleware [${m.id}] failed: ${res.error.message}`));
        }
        currentTree = res.value.tree;
        currentContext = res.value.context;
      } catch (err) {
        return new Err(new Error(`Middleware [${m.id}] error: ${(err as Error).message}`));
      }
    }

    return new Ok({ tree: currentTree, context: currentContext });
  }
}
