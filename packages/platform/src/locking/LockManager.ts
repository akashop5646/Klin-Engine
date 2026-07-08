import { ResourceLock } from "./ResourceLock";

export class LockManager {
  private _locks: Map<string, ResourceLock> = new Map();

  public tryAcquire(resourceId: string, ttlMs: number): ResourceLock | null {
    const active = this._locks.get(resourceId);
    if (active && active.expiresAt > Date.now()) {
      return null; // Lock is already held and not expired
    }
    const token = Math.random().toString(36).substring(2, 9);
    const lock: ResourceLock = {
      resourceId,
      token,
      acquiredAt: Date.now(),
      expiresAt: Date.now() + ttlMs,
    };
    this._locks.set(resourceId, lock);
    return lock;
  }

  public release(resourceId: string, token: string): boolean {
    const active = this._locks.get(resourceId);
    if (!active || active.token !== token) {
      return false;
    }
    this._locks.delete(resourceId);
    return true;
  }
}
