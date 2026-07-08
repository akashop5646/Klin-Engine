export interface UserPresence {
  userId: string;
  userName: string;
  activeBlockId?: string;
}

export class PresenceManager {
  private _users: Map<string, UserPresence> = new Map();

  public updateUserPresence(userId: string, userName: string, activeBlockId?: string): void {
    this._users.set(userId, { userId, userName, activeBlockId });
  }

  public getActiveUsers(): UserPresence[] {
    return Array.from(this._users.values());
  }

  public removeUser(userId: string): void {
    this._users.delete(userId);
  }
}
