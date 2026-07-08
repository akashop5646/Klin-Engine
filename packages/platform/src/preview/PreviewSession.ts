export class PreviewSession {
  public readonly websiteId: string;
  public viewers: Set<string> = new Set();
  public createdAt: number = Date.now();

  constructor(websiteId: string) {
    this.websiteId = websiteId;
  }

  public registerViewer(userId: string): void {
    this.viewers.add(userId);
  }

  public unregisterViewer(userId: string): void {
    this.viewers.delete(userId);
  }
}
