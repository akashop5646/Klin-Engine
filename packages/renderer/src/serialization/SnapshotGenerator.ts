import { RenderSnapshot } from "./RenderSnapshot";

export class SnapshotGenerator {
  public captureSnapshot(htmlString: string, assetUrls: string[]): RenderSnapshot {
    const id = Math.random().toString(36).substring(2, 9);
    return new RenderSnapshot(id, htmlString, assetUrls);
  }
}
