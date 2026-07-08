import { PublishStage } from "./PublishStage";

export class PublishPipeline {
  private _stages: PublishStage[] = [];

  public addStage(stage: PublishStage): void {
    this._stages.push(stage);
  }

  public async run(context: any): Promise<void> {
    for (const stage of this._stages) {
      console.log(`Running publish pipeline stage: ${stage.name}`);
      await stage.execute(context);
    }
  }
}
