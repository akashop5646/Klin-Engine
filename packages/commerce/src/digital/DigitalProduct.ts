export class DigitalProduct {
  public id: string;
  public filePath: string;
  public maxDownloads: number;

  constructor(id: string, filePath: string, maxDownloads: number = 3) {
    this.id = id;
    this.filePath = filePath;
    this.maxDownloads = maxDownloads;
  }
}
