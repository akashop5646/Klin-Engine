import { RegistrySnapshot, SerializedRegistryState } from "../snapshots/RegistrySnapshot";

export class RegistryExporter {
  private snapshot = new RegistrySnapshot();

  exportState(catalogs: any): string {
    const snap = this.snapshot.takeSnapshot(catalogs);
    return JSON.stringify(snap, null, 2);
  }

  importState(json: string, catalogs: any) {
    const parsed = JSON.parse(json) as SerializedRegistryState;
    this.snapshot.restore(parsed, catalogs);
  }
}
