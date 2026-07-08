export interface WebVitals {
  lcpMs: number;
  fidMs: number;
  cls: number;
}

export class PerformanceAnalytics {
  private _vitals: Map<string, WebVitals[]> = new Map();

  public logWebVitals(pageId: string, vitals: WebVitals): void {
    if (!this._vitals.has(pageId)) {
      this._vitals.set(pageId, []);
    }
    this._vitals.get(pageId)!.push(vitals);
  }

  public getAverageLCP(pageId: string): number {
    const list = this._vitals.get(pageId) || [];
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, curr) => acc + curr.lcpMs, 0);
    return sum / list.length;
  }
}
