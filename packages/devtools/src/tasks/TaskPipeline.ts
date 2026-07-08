import { Task, TaskContext } from "./Task";
import { TaskRunner } from "./TaskRunner";

export class TaskPipeline {
  private _tasks: Task[] = [];
  private _runner: TaskRunner;

  constructor(runner: TaskRunner) {
    this._runner = runner;
  }

  public add(task: Task): void {
    this._tasks.push(task);
  }

  public async runAll(context: TaskContext): Promise<boolean> {
    for (const task of this._tasks) {
      const success = await this._runner.run(task, context);
      if (!success) {
        return false;
      }
    }
    return true;
  }
}
