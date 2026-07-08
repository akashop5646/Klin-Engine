import type { PipelineStage } from "./PipelineStage";

export class PipelineRegistry {
  private stages: PipelineStage[] = [];

  register(stage: PipelineStage): void {
    // Avoid double registration of same stage id
    this.stages = this.stages.filter((s) => s.id !== stage.id);
    this.stages.push(stage);
    // Sort by priority ascending
    this.stages.sort((a, b) => a.priority - b.priority);
  }

  unregister(id: string): void {
    this.stages = this.stages.filter((s) => s.id !== id);
  }

  getStages(): PipelineStage[] {
    return [...this.stages];
  }
}
