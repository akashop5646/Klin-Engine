export class BuildProfiler {
  private _marks: Record<string, number> = {};

  public mark(name: string): void {
    this._marks[name] = Date.now();
  }

  public measure(startMark: string, endMark: string): number {
    const start = this._marks[startMark];
    const end = this._marks[endMark];
    if (!start || !end) return 0;
    return end - start;
  }
}
