export class Profiler {
  private _marks: Map<string, number> = new Map();

  public start(label: string): void {
    this._marks.set(label, performance.now());
  }

  public end(label: string): number {
    const startTime = this._marks.get(label);
    if (startTime === undefined) return 0;
    const duration = performance.now() - startTime;
    console.log(`[Profiler] ${label}: ${duration.toFixed(2)}ms`);
    this._marks.delete(label);
    return duration;
  }
}
