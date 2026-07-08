export class DevToolsMetrics {
  private _counters: Record<string, number> = {};

  public increment(name: string): void {
    if (!this._counters[name]) {
      this._counters[name] = 0;
    }
    this._counters[name]++;
  }

  public get(name: string): number {
    return this._counters[name] || 0;
  }
}
