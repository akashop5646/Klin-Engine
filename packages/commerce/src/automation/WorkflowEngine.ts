export interface CommerceAutomationStep {
  name: string;
  run(): Promise<void>;
}

export class WorkflowEngine {
  public async executeWorkflow(steps: CommerceAutomationStep[]): Promise<void> {
    for (const step of steps) {
      console.log(`WorkflowEngine executing step: ${step.name}`);
      await step.run();
    }
  }
}
