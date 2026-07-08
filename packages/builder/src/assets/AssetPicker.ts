import { MediaAsset } from "./AssetBrowser";

export class AssetPicker {
  private _selectedAsset?: MediaAsset;

  public pick(asset: MediaAsset): void {
    this._selectedAsset = asset;
  }

  public getPicked(): MediaAsset | undefined {
    return this._selectedAsset;
  }
}
