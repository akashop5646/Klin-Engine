import { TransactionStep } from "./TransactionStep";

export class PlatformTransaction {
  public readonly id: string;
  private _steps: TransactionStep[] = [];

  constructor(id: string) {
    this.id = id;
  }

  public addStep(step: TransactionStep): void {
    this._steps.push(step);
  }

  public get steps(): TransactionStep[] {
    return this._steps;
  }
}
