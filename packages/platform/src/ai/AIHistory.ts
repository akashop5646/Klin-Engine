export interface AIHistoryRecord {
  prompt: string;
  response: string;
  timestamp: number;
}

export class AIHistory {
  private _history: AIHistoryRecord[] = [];

  public append(prompt: string, response: string): void {
    this._history.push({ prompt, response, timestamp: Date.now() });
  }

  public get history(): AIHistoryRecord[] {
    return this._history;
  }
}
