import { BuildPlan } from "./BuildPlanner";

export class BuildScheduler {
  private _maxConcurrency: number;

  constructor(maxConcurrency: number = 4) {
    this._maxConcurrency = maxConcurrency;
  }

  public async execute(plan: BuildPlan, taskExecutor: (nodeId: string) => Promise<void>): Promise<void> {
    for (const batch of plan.batches) {
      // Execute each batch in chunks up to maxConcurrency
      for (let i = 0; i < batch.length; i += this._maxConcurrency) {
        const chunk = batch.slice(i, i + this._maxConcurrency);
        await Promise.all(chunk.map(nodeId => taskExecutor(nodeId)));
      }
    }
  }
}
