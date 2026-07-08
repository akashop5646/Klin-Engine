import { SagaCompensation } from "./SagaCompensation";

export class SagaStep {
  public name: string;
  public action: () => Promise<void>;
  public compensation?: SagaCompensation;

  constructor(name: string, action: () => Promise<void>, compensation?: SagaCompensation) {
    this.name = name;
    this.action = action;
    this.compensation = compensation;
  }
}
