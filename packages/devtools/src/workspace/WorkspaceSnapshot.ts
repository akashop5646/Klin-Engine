export interface WorkspaceSnapshotData {
  config: any;
  registryState: any;
  hashes: Record<string, string>;
  lockfileState: string;
  packagesList: string[];
}

export class WorkspaceSnapshot {
  private _snapshotData?: WorkspaceSnapshotData;

  public capture(data: WorkspaceSnapshotData): void {
    this._snapshotData = data;
    console.log("Workspace snapshot captured.");
  }

  public restore(): WorkspaceSnapshotData {
    if (!this._snapshotData) {
      throw new Error("No workspace snapshot available to restore.");
    }
    console.log("Workspace snapshot restored.");
    return this._snapshotData;
  }
}
