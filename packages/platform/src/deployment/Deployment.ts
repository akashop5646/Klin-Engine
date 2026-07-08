export class Deployment {
  public id: string;
  public websiteId: string;
  public commitHash?: string;
  public status: "Pending" | "Uploading" | "Success" | "Failed" = "Pending";
  public timestamp: number = Date.now();

  constructor(id: string, websiteId: string) {
    this.id = id;
    this.websiteId = websiteId;
  }
}
