import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import { Result } from "@klin/core";

export interface RendererMiddleware {
  id: string;
  priority: number;
  process(
    tree: RenderTree,
    context: RendererContext
  ): Promise<Result<{ tree: RenderTree; context: RendererContext }, Error>>;
}
