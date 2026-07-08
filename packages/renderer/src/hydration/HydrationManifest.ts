export interface HydrationIsland {
  id: string;
  blockId: string;
  props: Record<string, unknown>;
}

export class HydrationManifest {
  private islands: Map<string, HydrationIsland> = new Map();

  addIsland(id: string, blockId: string, props: Record<string, unknown>): void {
    this.islands.set(id, { id, blockId, props });
  }

  getIslands(): HydrationIsland[] {
    return Array.from(this.islands.values());
  }

  getSerializedData(): Record<string, unknown> {
    return {
      islands: this.getIslands(),
      timestamp: Date.now(),
    };
  }

  clear() {
    this.islands.clear();
  }
}
