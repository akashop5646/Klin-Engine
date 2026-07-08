import { AssetReference } from "../fields/AssetReference";

export class AssetLibrary {
  private _assets: Map<string, AssetReference> = new Map();

  public addAsset(asset: AssetReference): void {
    this._assets.set(asset.id, asset);
  }

  public getAsset(id: string): AssetReference | undefined {
    return this._assets.get(id);
  }

  public removeAsset(id: string): void {
    this._assets.delete(id);
  }

  public getAllAssets(): AssetReference[] {
    return Array.from(this._assets.values());
  }
}
