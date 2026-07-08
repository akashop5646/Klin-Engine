import { FileWatcher } from "./FileWatcher";

export class WorkspaceWatcher {
  private _watcher: FileWatcher;

  constructor(watcher: FileWatcher) {
    this._watcher = watcher;
  }

  public watchWorkspace(workspaceDir: string, onConfigChange: () => void): void {
    this._watcher.watchDirectory(workspaceDir, (event, filename) => {
      if (filename && (filename.includes("klin.config.ts") || filename.includes("package.json"))) {
        onConfigChange();
      }
    });
  }
}
