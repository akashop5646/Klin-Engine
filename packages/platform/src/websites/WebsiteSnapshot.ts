export class WebsiteSnapshot {
  public snapshotId: string;
  public websiteId: string;
  public serializedLayouts: string;
  public timestamp: number;

  constructor(snapshotId: string, websiteId: string, serializedLayouts: string) {
    this.snapshotId = snapshotId;
    this.websiteId = websiteId;
    this.serializedLayouts = serializedLayouts;
    this.timestamp = Date.now();
  }
}
