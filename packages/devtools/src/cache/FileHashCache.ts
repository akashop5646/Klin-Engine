import * as crypto from "crypto";

export class FileHashCache {
  private _hashes: Record<string, string> = {};

  public calculateHash(content: string): string {
    return crypto.createHash("sha256").update(content).digest("hex");
  }

  public isChanged(filePath: string, currentHash: string): boolean {
    const prev = this._hashes[filePath];
    if (!prev || prev !== currentHash) {
      this._hashes[filePath] = currentHash;
      return true;
    }
    return false;
  }
}
