import { ResourceLock } from "./ResourceLock";

export class DistributedLock {
  public async acquire(resourceId: string, ttlMs: number): Promise<ResourceLock> {
    return {
      resourceId,
      token: "dist-lock-" + Math.random().toString(36).substring(2, 9),
      acquiredAt: Date.now(),
      expiresAt: Date.now() + ttlMs,
    };
  }

  public async release(resourceId: string, token: string): Promise<boolean> {
    console.log(`Released distributed lock for resource: ${resourceId}`);
    return true;
  }
}
