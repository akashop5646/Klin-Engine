import type { RendererMiddleware } from "../middleware/RendererMiddleware";
import type { IRenderer } from "../core/IRenderer";
import type { PipelineStage } from "../pipeline/PipelineStage";

export interface RendererPlugin {
  id: string;
  name: string;
  version: string;
  
  // Dynamic register hooks
  registerMiddleware?(): RendererMiddleware[];
  registerRenderer?(): IRenderer[];
  registerPipelineStage?(): PipelineStage[];
}
