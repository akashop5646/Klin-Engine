export type SchedulerPriority = "Critical" | "High" | "Normal" | "Low" | "Idle";

export class RenderScheduler {
  private _queues: Record<SchedulerPriority, Array<() => void>> = {
    Critical: [],
    High: [],
    Normal: [],
    Low: [],
    Idle: [],
  };
  private _isProcessing: boolean = false;

  public schedule(priority: SchedulerPriority, task: () => void): void {
    this._queues[priority].push(task);
    this.requestFlush();
  }

  private requestFlush(): void {
    if (this._isProcessing) return;
    this._isProcessing = true;

    // Flush batch task execution asynchronously
    setTimeout(() => {
      this.flush();
    }, 0);
  }

  private flush(): void {
    this._isProcessing = false;
    const priorities: SchedulerPriority[] = ["Critical", "High", "Normal", "Low", "Idle"];

    for (const priority of priorities) {
      const tasks = this._queues[priority];
      this._queues[priority] = [];
      for (const task of tasks) {
        try {
          task();
        } catch (err) {
          console.error(`Scheduler execution failed for priority [${priority}]:`, err);
        }
      }
    }
  }
}
