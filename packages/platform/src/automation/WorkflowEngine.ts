export interface WorkflowStep {
  name: string;
  run: () => Promise<void>;
}

export class WorkflowEngine {
  public async runWorkflow(steps: WorkflowStep[]): Promise<void> {
    for (const step of steps) {
      console.log(`WorkflowEngine executing automation: ${step.name}`);
      await step.run();
    }
  }
}
