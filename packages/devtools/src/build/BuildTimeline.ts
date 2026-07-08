export interface TimeRecord {
  phase: string;
  durationMs: number;
}

export class BuildTimeline {
  private _records: TimeRecord[] = [];
  private _startTimes: Record<string, number> = {};

  public startPhase(phase: string): void {
    this._startTimes[phase] = Date.now();
  }

  public endPhase(phase: string): void {
    const start = this._startTimes[phase];
    if (start) {
      this._records.push({
        phase,
        durationMs: Date.now() - start
      });
    }
  }

  public getRecords(): TimeRecord[] {
    return this._records;
  }
}
