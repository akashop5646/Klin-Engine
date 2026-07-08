export class RewardPoints {
  private _points: Map<string, number> = new Map();

  public addPoints(customerId: string, pts: number): void {
    const current = this._points.get(customerId) || 0;
    this._points.set(customerId, current + pts);
  }

  public getPoints(customerId: string): number {
    return this._points.get(customerId) || 0;
  }
}
