import { JobQueue } from "./JobQueue";

export class JobScheduler {
  private _queue: JobQueue;

  constructor(queue: JobQueue) {
    this._queue = queue;
  }

  public schedule(type: string, payload: any, delayMs: number): void {
    setTimeout(() => {
      this._queue.enqueue(type, payload);
    }, delayMs);
  }
}
