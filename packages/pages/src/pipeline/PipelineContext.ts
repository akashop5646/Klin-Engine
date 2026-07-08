import type { PageInstance } from "../core/PageFactory";
import type { RenderTree } from "../render-tree/RenderTree";
import type { ResolvedDependencies } from "../composition/PageDependencyResolver";
import type { ValidationReport } from "../runtime/PageValidator";

export interface PipelineContext {
  pageInstance: PageInstance;
  dependencies?: ResolvedDependencies;
  validationReport?: ValidationReport;
  renderTree?: RenderTree;
  metadata?: Record<string, unknown>;
}
