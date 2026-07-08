import { Task, TaskContext } from "./Task";

export class TaskRunner {
  public async run(task: Task, context: TaskContext): Promise<boolean> {
    task.status = "Running";
    console.log(`[TaskRunner] Starting task: ${task.name}`);
    try {
      await task.run(context);
      task.status = "Success";
      console.log(`[TaskRunner] Completed task: ${task.name}`);
      return true;
    } catch (error) {
      task.status = "Failed";
      console.error(`[TaskRunner] Failed task: ${task.name}`, error);
      return false;
    }
  }
}
