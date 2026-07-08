export class MetricsCollector {
  private _timings: Map<string, number> = new Map();

  public logMetric(name: string, durationMs: number): void {
    this._timings.set(name, durationMs);
  }

  public getMetric(name: string): number | undefined {
    return this._timings.get(name);
  }
}
