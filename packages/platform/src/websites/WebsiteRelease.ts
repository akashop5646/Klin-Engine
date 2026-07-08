export class WebsiteRelease {
  public releaseId: string;
  public websiteId: string;
  public snapshotId: string;
  public versionNumber: number;
  public stage: string;
  public releasedAt: number;

  constructor(releaseId: string, websiteId: string, snapshotId: string, versionNumber: number, stage: string) {
    this.releaseId = releaseId;
    this.websiteId = websiteId;
    this.snapshotId = snapshotId;
    this.versionNumber = versionNumber;
    this.stage = stage;
    this.releasedAt = Date.now();
  }
}
