export class ChunkScheduler {
  private _chunksQueue: Array<() => void> = [];

  public scheduleChunkLoad(loadFn: () => void): void {
    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      (window as any).requestIdleCallback(() => loadFn());
    } else {
      setTimeout(() => loadFn(), 200);
    }
  }
}
