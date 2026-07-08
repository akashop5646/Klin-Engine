export class PresenceManager {
  private _online: Set<string> = new Set();

  public userOnline(userId: string): void {
    this._online.add(userId);
  }

  public userOffline(userId: string): void {
    this._online.delete(userId);
  }

  public get onlineUsers(): string[] {
    return Array.from(this._online);
  }
}
