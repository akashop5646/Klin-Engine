import * as fs from "fs";
import * as path from "path";

export class WorkspaceLock {
  private lockFilePath: string;

  constructor(workspaceDir: string) {
    this.lockFilePath = path.join(workspaceDir, ".klin.lock");
  }

  public acquire(): boolean {
    if (this.isLocked()) {
      return false;
    }
    try {
      fs.writeFileSync(this.lockFilePath, JSON.stringify({
        pid: process.pid,
        acquiredAt: new Date().toISOString()
      }));
      return true;
    } catch {
      return false;
    }
  }

  public release(): void {
    try {
      if (fs.existsSync(this.lockFilePath)) {
        fs.unlinkSync(this.lockFilePath);
      }
    } catch (e) {
      console.warn("Failed to release workspace lock:", e);
    }
  }

  public isLocked(): boolean {
    return fs.existsSync(this.lockFilePath);
  }
}
