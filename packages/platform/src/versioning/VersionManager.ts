export class VersionManager {
  private _versions: Map<string, number> = new Map();

  public bumpVersion(websiteId: string): number {
    const current = this._versions.get(websiteId) || 0;
    const next = current + 1;
    this._versions.set(websiteId, next);
    return next;
  }

  public getVersion(websiteId: string): number {
    return this._versions.get(websiteId) || 0;
  }
}
