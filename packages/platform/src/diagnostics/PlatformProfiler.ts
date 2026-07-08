export class PlatformProfiler {
  private _marks: Map<string, number> = new Map();

  public mark(name: string): void {
    this._marks.set(name, Date.now());
  }

  public measure(startMark: string, endMark: string): number {
    const start = this._marks.get(startMark) || 0;
    const end = this._marks.get(endMark) || 0;
    return end - start;
  }
}
