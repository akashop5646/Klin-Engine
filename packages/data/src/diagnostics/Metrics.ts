export interface MetricRecord {
  name: string;
  durationMs: number;
  timestamp: Date;
  meta?: any;
}

export class Metrics {
  private static _records: MetricRecord[] = [];

  public static record(name: string, durationMs: number, meta?: any): void {
    this._records.push({
      name,
      durationMs,
      timestamp: new Date(),
      meta,
    });
  }

  public static getMetrics(): MetricRecord[] {
    return this._records;
  }

  public static clear(): void {
    this._records = [];
  }
}
