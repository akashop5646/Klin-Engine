export interface PublishLog {
  websiteId: string;
  durationMs: number;
  status: "Success" | "Failed";
  timestamp: number;
}

export class PublishHistory {
  private _logs: PublishLog[] = [];

  public logPublish(websiteId: string, durationMs: number, status: "Success" | "Failed"): void {
    this._logs.push({
      websiteId,
      durationMs,
      status,
      timestamp: Date.now(),
    });
  }

  public get logs(): PublishLog[] {
    return this._logs;
  }
}
