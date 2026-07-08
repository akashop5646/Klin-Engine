export interface TraceEntry {
  timestamp: string;
  label: string;
  durationMs: number;
}

export class TraceViewer {
  private _entries: TraceEntry[] = [];

  public addEntry(label: string, durationMs: number): void {
    this._entries.push({
      timestamp: new Date().toISOString(),
      label,
      durationMs
    });
  }

  public print(): void {
    console.log("[TraceViewer] Execution Trace:");
    for (const entry of this._entries) {
      console.log(`  ${entry.timestamp} | ${entry.label.padEnd(30)} | ${entry.durationMs}ms`);
    }
  }

  public getEntries(): TraceEntry[] {
    return this._entries;
  }
}
