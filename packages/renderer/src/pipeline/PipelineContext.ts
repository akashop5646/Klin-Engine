import type { RendererContext } from "../core/RendererContext";
import type { RenderTree } from "@klin/pages";

export interface PipelineContext {
  rendererContext: RendererContext;
  renderTree: RenderTree;
  validationErrors: string[];
  resolvedComponents: Map<string, any>; // blockId -> Component implementation
  resolvedAssets: Map<string, string>; // assetId -> URL path
  compiledStyles: string;
  metadata: Record<string, unknown>;

  // Enterprise v2.1 Expansions
  data?: Record<string, any>;
  variables?: Record<string, any>;
  layoutTree?: any;
  output?: string;
}
