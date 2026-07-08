export class LockManager {
  private _locks: Map<string, { userId: string; expiresAt: number }> = new Map();

  public acquireLock(resourceId: string, userId: string, durationMs: number = 30000): boolean {
    const current = this._locks.get(resourceId);
    if (current && current.userId !== userId && Date.now() < current.expiresAt) {
      return false; // locked by someone else
    }
    
    this._locks.set(resourceId, {
      userId,
      expiresAt: Date.now() + durationMs,
    });
    return true;
  }

  public releaseLock(resourceId: string, userId: string): boolean {
    const current = this._locks.get(resourceId);
    if (!current) return true;
    if (current.userId !== userId) return false;

    this._locks.delete(resourceId);
    return true;
  }

  public isLocked(resourceId: string): boolean {
    const current = this._locks.get(resourceId);
    if (!current) return false;
    return Date.now() < current.expiresAt;
  }
}
