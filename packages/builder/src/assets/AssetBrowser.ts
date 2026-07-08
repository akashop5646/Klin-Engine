export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  folder: string;
}

export class AssetBrowser {
  private _assets: MediaAsset[] = [];

  public registerAsset(asset: MediaAsset): void {
    this._assets.push(asset);
  }

  public getAssets(folder: string = "/"): MediaAsset[] {
    return this._assets.filter((a) => a.folder === folder);
  }
}
