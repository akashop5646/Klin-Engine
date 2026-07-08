import type { PipelineContext } from "./PipelineContext";
import { Result } from "@klin/core";

export interface PipelineStage {
  id: string;
  priority: number;
  execute(context: PipelineContext): Promise<Result<PipelineContext, Error>>;
}
