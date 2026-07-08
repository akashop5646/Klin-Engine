import { SagaStep } from "./SagaStep";

export class Saga {
  public id: string;
  private _steps: SagaStep[] = [];

  constructor(id: string) {
    this.id = id;
  }

  public addStep(step: SagaStep): void {
    this._steps.push(step);
  }

  public get steps(): SagaStep[] {
    return this._steps;
  }
}
