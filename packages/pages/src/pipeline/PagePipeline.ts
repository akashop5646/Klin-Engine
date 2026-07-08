import type { PipelineStage } from "./PipelineStage";
import type { PipelineContext } from "./PipelineContext";
import type { PageInstance } from "../core/PageFactory";
import { PipelineRegistry } from "./PipelineRegistry";
import { Result, Ok, Err } from "@klin/core";

export class PagePipeline {
  private registry = new PipelineRegistry();

  addStage(stage: PipelineStage): this {
    this.registry.register(stage);
    return this;
  }

  getRegistry(): PipelineRegistry {
    return this.registry;
  }

  async execute(pageInstance: PageInstance): Promise<Result<PipelineContext, Error>> {
    let context: PipelineContext = {
      pageInstance,
    };

    const stages = this.registry.getStages();

    for (const stage of stages) {
      try {
        const res = await stage.execute(context);
        if (!res.ok) {
          return new Err(new Error(`Pipeline stage [${stage.id}] failed: ${res.error.message}`));
        }
        context = res.value;
      } catch (err) {
        return new Err(new Error(`Pipeline stage [${stage.id}] error: ${(err as Error).message}`));
      }
    }

    return new Ok(context);
  }
}
