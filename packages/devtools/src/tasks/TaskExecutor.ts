import { Task, TaskContext } from "./Task";
import { TaskRunner } from "./TaskRunner";

export class TaskExecutor {
  private _runner: TaskRunner;

  constructor(runner: TaskRunner) {
    this._runner = runner;
  }

  public async executeSingle(task: Task, context: TaskContext): Promise<boolean> {
    return this._runner.run(task, context);
  }
}
