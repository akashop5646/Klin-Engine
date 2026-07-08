export class WebsiteVersion {
  public versionId: string;
  public websiteId: string;
  public versionNumber: number;
  public authorId: string;
  public createdAt: number;

  constructor(versionId: string, websiteId: string, versionNumber: number, authorId: string) {
    this.versionId = versionId;
    this.websiteId = websiteId;
    this.versionNumber = versionNumber;
    this.authorId = authorId;
    this.createdAt = Date.now();
  }
}
