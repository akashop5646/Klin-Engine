export class AssetFolder {
  public readonly name: string;
  public readonly path: string;
  public childFolders: AssetFolder[] = [];
  public assetIds: string[] = [];

  constructor(name: string, path: string) {
    this.name = name;
    this.path = path;
  }

  public addAsset(assetId: string): void {
    if (!this.assetIds.includes(assetId)) {
      this.assetIds.push(assetId);
    }
  }

  public addChildFolder(folder: AssetFolder): void {
    this.childFolders.push(folder);
  }
}
