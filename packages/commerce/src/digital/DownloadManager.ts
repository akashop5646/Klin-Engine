import { Download } from "./Download";

export class DownloadManager {
  private _downloads: Map<string, Download> = new Map();

  public trackDownload(customerId: string, fileId: string): boolean {
    const key = `${customerId}:${fileId}`;
    const d = this._downloads.get(key) || new Download(fileId, customerId);
    if (d.downloadCount >= 3) return false;
    d.downloadCount++;
    this._downloads.set(key, d);
    return true;
  }
}
