import { FileWatcher } from "./FileWatcher";

export class AssetWatcher {
  private _watcher: FileWatcher;

  constructor(watcher: FileWatcher) {
    this._watcher = watcher;
  }

  public watchAssets(assetsDir: string, onAssetChange: (filename: string) => void): void {
    this._watcher.watchDirectory(assetsDir, (event, filename) => {
      if (filename) {
        onAssetChange(filename);
      }
    });
  }
}
