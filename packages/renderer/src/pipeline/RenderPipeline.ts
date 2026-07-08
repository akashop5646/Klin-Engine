import { PipelineStage } from "./PipelineStage";
import { PipelineContext } from "./PipelineContext";
import { Result, Ok } from "@klin/core";

export class RenderPipeline {
  private _stages: PipelineStage[] = [];

  public register(stage: PipelineStage): void {
    this._stages.push(stage);
    this._stages.sort((a, b) => a.priority - b.priority);
  }

  public async execute(context: PipelineContext): Promise<Result<PipelineContext, Error>> {
    let currentCtx = context;
    for (const stage of this._stages) {
      const res = await stage.execute(currentCtx);
      if (!res.ok) {
        return res;
      }
      currentCtx = res.value;
    }
    return new Ok(currentCtx);
  }
}
