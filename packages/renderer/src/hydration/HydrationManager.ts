import { HydrationManifest } from "./HydrationManifest";

export class HydrationManager {
  private activeManifest = new HydrationManifest();

  getManifest(): HydrationManifest {
    return this.activeManifest;
  }

  generateHydrationScript(): string {
    const data = JSON.stringify(this.activeManifest.getSerializedData());
    return `<script id="klin-hydration-data" type="application/json">${data}</script>`;
  }

  registerIsland(id: string, blockId: string, props: Record<string, unknown>): void {
    this.activeManifest.addIsland(id, blockId, props);
  }
}
