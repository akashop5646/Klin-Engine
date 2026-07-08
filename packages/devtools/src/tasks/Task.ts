export type TaskStatus = "Pending" | "Running" | "Success" | "Failed";

export interface TaskContext {
  workspaceDir: string;
  options: Record<string, any>;
}

export abstract class Task {
  public abstract readonly name: string;
  private _status: TaskStatus = "Pending";

  public get status(): TaskStatus {
    return this._status;
  }

  public set status(newStatus: TaskStatus) {
    this._status = newStatus;
  }

  public abstract run(context: TaskContext): Promise<void>;
}
