export class PerformanceTimeline {
  private _events: Array<{ name: string; timestamp: number }> = [];

  public logEvent(name: string): void {
    this._events.push({ name, timestamp: Date.now() });
  }

  public getEventsTimeline(): string {
    return this._events.map((e) => `[${e.timestamp}]: ${e.name}`).join("\n");
  }
}
