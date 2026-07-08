export class PerformanceTimeline {
  private _logs: string[] = [];

  public logEvent(msg: string): void {
    this._logs.push(`${Date.now()}: ${msg}`);
  }

  public get logs(): string[] {
    return this._logs;
  }
}
