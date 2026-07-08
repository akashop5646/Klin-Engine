export interface AIActivityRecord {
  id: string;
  action: string;
  tokensUsed: number;
  timestamp: number;
}

export class AIActivity {
  private _records: AIActivityRecord[] = [];

  public log(action: string, tokensUsed: number): void {
    this._records.push({
      id: "ai-act-" + Math.random().toString(36).substring(2, 9),
      action,
      tokensUsed,
      timestamp: Date.now(),
    });
  }

  public get records(): AIActivityRecord[] {
    return this._records;
  }
}
