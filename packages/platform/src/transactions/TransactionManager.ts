import { PlatformTransaction } from "./PlatformTransaction";

export class TransactionManager {
  public async execute(transaction: PlatformTransaction): Promise<boolean> {
    const executedSteps = [];
    try {
      for (const step of transaction.steps) {
        console.log(`Executing transaction step: ${step.name}`);
        await step.action();
        executedSteps.push(step);
      }
      return true;
    } catch (err) {
      console.warn("Transaction failed, starting compensation steps...", err);
      for (let i = executedSteps.length - 1; i >= 0; i--) {
        const step = executedSteps[i];
        if (step.compensation) {
          try {
            console.log(`Compensating step: ${step.compensation.name}`);
            await step.compensation.compensate();
          } catch (compErr) {
            console.error(`Compensation failed for step: ${step.compensation.name}`, compErr);
          }
        }
      }
      return false;
    }
  }
}
