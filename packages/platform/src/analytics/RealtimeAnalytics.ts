export class RealtimeAnalytics {
  private _activeUsers: Map<string, number> = new Map();

  public userJoined(websiteId: string): void {
    const current = this._activeUsers.get(websiteId) || 0;
    this._activeUsers.set(websiteId, current + 1);
  }

  public userLeft(websiteId: string): void {
    const current = this._activeUsers.get(websiteId) || 0;
    if (current > 0) {
      this._activeUsers.set(websiteId, current - 1);
    }
  }

  public getActiveViewers(websiteId: string): number {
    return this._activeUsers.get(websiteId) || 0;
  }
}
