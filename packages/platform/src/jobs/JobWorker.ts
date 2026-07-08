import { PlatformJob } from "./PlatformJob";
import { JobQueue } from "./JobQueue";

export class JobWorker {
  private _queue: JobQueue;
  private _active: boolean = false;

  constructor(queue: JobQueue) {
    this._queue = queue;
  }

  public async startProcessing(handler: (job: PlatformJob) => Promise<void>): Promise<void> {
    this._active = true;
    while (this._active) {
      const job = this._queue.dequeue();
      if (job) {
        job.status = "Running";
        try {
          await handler(job);
          job.status = "Completed";
        } catch (err) {
          job.status = "Failed";
          console.error(`Platform job failed to execute: ${job.id}`, err);
        }
      } else {
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
  }

  public stop(): void {
    this._active = false;
  }
}
