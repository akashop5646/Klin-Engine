export class RollbackManager {
  public async rollbackToSnapshot(websiteId: string, snapshotId: string): Promise<boolean> {
    console.log(`Rollback triggered for website: ${websiteId} to snapshot: ${snapshotId}`);
    return true;
  }
}
