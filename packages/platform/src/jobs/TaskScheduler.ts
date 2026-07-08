import { PlatformJob } from "./PlatformJob";

export class TaskScheduler {
  private _dlq: PlatformJob[] = [];

  public scheduleDelayed(job: PlatformJob, delayMs: number): void {
    console.log(`Scheduled delayed job: ${job.id} with delay: ${delayMs}ms`);
  }

  public moveToDLQ(job: PlatformJob): void {
    console.warn(`Moving job: ${job.id} to Dead-Letter Queue`);
    this._dlq.push(job);
  }

  public get dlq(): PlatformJob[] {
    return this._dlq;
  }
}
