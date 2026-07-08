export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  details: string;
  timestamp: number;
}

export class ActivityFeed {
  private _feed: ActivityLog[] = [];

  public logActivity(userId: string, action: string, details: string): void {
    this._feed.push({
      id: "act-" + Math.random().toString(36).substring(2, 9),
      userId,
      action,
      details,
      timestamp: Date.now(),
    });
  }

  public get feed(): ActivityLog[] {
    return this._feed;
  }
}
