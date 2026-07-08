export class RestoreManager {
  public restoreLayout(websiteId: string, snapshotId: string): void {
    console.log(`RestoreManager restored website ${websiteId} to snapshot: ${snapshotId}`);
  }
}
