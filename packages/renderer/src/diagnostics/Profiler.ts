export class Profiler {
  private _marks: Map<string, number> = new Map();

  public mark(label: string): void {
    this._marks.set(label, Date.now());
  }

  public measure(label: string): number {
    const start = this._marks.get(label);
    return start ? Date.now() - start : 0;
  }
}
