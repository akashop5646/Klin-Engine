import { Job } from "./Job";

export class JobQueue {
  private _queue: Job[] = [];
  private _listeners: Set<(job: Job) => void> = new Set();

  public enqueue(name: string, payload: any): Job {
    const job = new Job({
      id: Math.random().toString(36).substring(2, 9),
      name,
      payload,
    });
    this._queue.push(job);
    this._listeners.forEach((listener) => listener(job));
    return job;
  }

  public dequeue(): Job | undefined {
    return this._queue.shift();
  }

  public onEnqueue(listener: (job: Job) => void): () => void {
    this._listeners.add(listener);
    return () => {
      this._listeners.delete(listener);
    };
  }

  public getJobs(): Job[] {
    return this._queue;
  }
}
