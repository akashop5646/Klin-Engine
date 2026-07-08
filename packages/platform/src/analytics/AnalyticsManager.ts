export class AnalyticsManager {
  private _pageViews: Map<string, number> = new Map();

  public logPageView(pageId: string): void {
    const current = this._pageViews.get(pageId) || 0;
    this._pageViews.set(pageId, current + 1);
  }

  public getPageViews(pageId: string): number {
    return this._pageViews.get(pageId) || 0;
  }
}
