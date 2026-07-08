export interface Snapshot {
  state: any;
  strategy: "Snapshot" | "Delta" | "Hybrid";
  delta?: any;
}

export class SnapshotManager {
  private strategy: "Snapshot" | "Delta" | "Hybrid" = "Snapshot";

  constructor(strategy?: "Snapshot" | "Delta" | "Hybrid") {
    if (strategy) this.strategy = strategy;
  }

  create(state: any): Snapshot {
    const clone = JSON.parse(JSON.stringify(state));
    return {
      state: clone,
      strategy: this.strategy,
    };
  }

  apply(snapshot: Snapshot): any {
    return JSON.parse(JSON.stringify(snapshot.state));
  }
}
