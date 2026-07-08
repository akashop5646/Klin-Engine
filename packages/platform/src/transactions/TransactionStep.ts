import { CompensationStep } from "./CompensationStep";

export class TransactionStep {
  public name: string;
  public action: () => Promise<void>;
  public compensation?: CompensationStep;

  constructor(name: string, action: () => Promise<void>, compensation?: CompensationStep) {
    this.name = name;
    this.action = action;
    this.compensation = compensation;
  }
}
