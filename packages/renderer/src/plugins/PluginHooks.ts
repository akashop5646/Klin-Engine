import type { RenderTree } from "@klin/pages";
import type { RendererContext } from "../core/RendererContext";
import type { RenderResult } from "../contracts/RenderResult";

export interface PluginHooks {
  beforeRender?(tree: RenderTree, context: RendererContext): Promise<void> | void;
  afterRender?(tree: RenderTree, result: RenderResult, context: RendererContext): Promise<void> | void;
  beforeOptimize?(tree: RenderTree): Promise<void> | void;
  afterOptimize?(tree: RenderTree): Promise<void> | void;
}
