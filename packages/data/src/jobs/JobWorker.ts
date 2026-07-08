import { JobQueue } from "./JobQueue";
import { Job } from "./Job";

export class JobWorker {
  private readonly _queue: JobQueue;
  private _isProcessing: boolean = false;
  private _handlers: Map<string, (payload: any) => Promise<void>> = new Map();

  constructor(queue: JobQueue) {
    this._queue = queue;
    this._queue.onEnqueue(() => this.processNext());
  }

  public registerHandler(jobName: string, handler: (payload: any) => Promise<void>): void {
    this._handlers.set(jobName, handler);
  }

  private async processNext(): Promise<void> {
    if (this._isProcessing) return;
    
    const job = this._queue.dequeue();
    if (!job) return;

    this._isProcessing = true;
    job.status = "Running";
    job.startedAt = new Date();

    const handler = this._handlers.get(job.name);
    if (handler) {
      try {
        await handler(job.payload);
        job.status = "Completed";
      } catch (err: any) {
        job.status = "Failed";
        job.error = err.message || "Job execution failed";
      }
    } else {
      job.status = "Failed";
      job.error = `No handler registered for job: ${job.name}`;
    }

    job.completedAt = new Date();
    this._isProcessing = false;
    
    // Process subsequent queued items
    this.processNext();
  }
}
