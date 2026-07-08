import type { PublishingStage } from "./PublishingStage";
import type { PublishContext } from "./PublishContext";
import { Result, Ok, Err } from "@klin/core";

export class PublishingPipeline {
  private stages: PublishingStage[] = [];

  addStage(stage: PublishingStage): this {
    this.stages.push(stage);
    this.stages.sort((a, b) => a.priority - b.priority);
    return this;
  }

  async publish(context: PublishContext): Promise<Result<PublishContext, Error>> {
    let currentCtx = context;

    for (const stage of this.stages) {
      try {
        const res = await stage.execute(currentCtx);
        if (!res.ok) {
          return new Err(new Error(`Publishing stage [${stage.id}] failed: ${res.error.message}`));
        }
        currentCtx = res.value;
      } catch (err) {
        return new Err(new Error(`Publishing stage [${stage.id}] error: ${(err as Error).message}`));
      }
    }

    return new Ok(currentCtx);
  }
}
