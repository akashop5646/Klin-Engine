export interface SiteVersion {
  versionNumber: number;
  timestampMs: number;
  layoutState: any;
  label?: string;
}

export class VersionManager {
  private _versions: SiteVersion[] = [];
  private _counter: number = 0;

  public createCheckpoint(layoutState: any, label?: string): SiteVersion {
    this._counter++;
    const nv: SiteVersion = {
      versionNumber: this._counter,
      timestampMs: Date.now(),
      layoutState,
      label,
    };
    this._versions.push(nv);
    return nv;
  }

  public getVersions(): SiteVersion[] {
    return this._versions;
  }

  public restoreVersion(versionNumber: number): any | undefined {
    const found = this._versions.find((v) => v.versionNumber === versionNumber);
    return found ? found.layoutState : undefined;
  }
}
