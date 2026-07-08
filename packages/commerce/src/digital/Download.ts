export class Download {
  public downloadId: string;
  public customerId: string;
  public downloadCount: number = 0;

  constructor(downloadId: string, customerId: string) {
    this.downloadId = downloadId;
    this.customerId = customerId;
  }
}
