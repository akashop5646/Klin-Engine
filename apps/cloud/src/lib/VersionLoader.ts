export interface FileVersion {
  versionId: string;
  timestamp: string;
  snapshotJson: string;
}

export class VersionLoader {
  private _versions: FileVersion[] = [];

  public saveVersion(snapshotJson: string): void {
    const version: FileVersion = {
      versionId: `ver-${Math.random().toString(36).substr(2, 9)}`,
      timestamp: new Date().toISOString(),
      snapshotJson
    };
    this._versions.push(version);
    console.log(`Saved version snapshot: ${version.versionId}`);
  }

  public getVersions(): FileVersion[] {
    return this._versions;
  }

  public loadVersion(versionId: string): string {
    const ver = this._versions.find(v => v.versionId === versionId);
    if (!ver) {
      throw new Error(`Version ID: ${versionId} not found.`);
    }
    return ver.snapshotJson;
  }
}
