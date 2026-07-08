import { PlatformJob } from "./PlatformJob";

export class JobQueue {
  private _jobs: PlatformJob[] = [];

  public enqueue(type: string, payload: any): PlatformJob {
    const job: PlatformJob = {
      id: "job-" + Math.random().toString(36).substring(2, 9),
      type,
      payload,
      status: "Pending",
      createdAt: Date.now(),
    };
    this._jobs.push(job);
    return job;
  }

  public dequeue(): PlatformJob | undefined {
    return this._jobs.shift();
  }

  public get pendingCount(): number {
    return this._jobs.length;
  }
}
