export class RenderSnapshot {
  public readonly snapshotId: string;
  public readonly capturedAt: number;
  public readonly htmlPayload: string;
  public readonly assetDependencies: string[];

  constructor(snapshotId: string, htmlPayload: string, assetDependencies: string[]) {
    this.snapshotId = snapshotId;
    this.capturedAt = Date.now();
    this.htmlPayload = htmlPayload;
    this.assetDependencies = assetDependencies;
  }
}
