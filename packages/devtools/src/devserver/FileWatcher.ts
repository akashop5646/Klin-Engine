import * as fs from "fs";

export class FileWatcher {
  private _watcher?: fs.FSWatcher;

  public watchDirectory(dirPath: string, callback: (event: string, filename: string | null) => void): void {
    console.log(`Watching directory for changes: ${dirPath}`);
    this._watcher = fs.watch(dirPath, { recursive: true }, (event, filename) => {
      callback(event, filename);
    });
  }

  public close(): void {
    this._watcher?.close();
  }
}
