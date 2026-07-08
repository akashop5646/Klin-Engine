export class AutosaveManager {
  private _intervalId?: NodeJS.Timeout;
  private _saveFn: () => Promise<void>;
  private _intervalMs: number;

  constructor(saveFn: () => Promise<void>, intervalMs: number = 30000) {
    this._saveFn = saveFn;
    this._intervalMs = intervalMs;
  }

  public start(): void {
    if (this._intervalId) return;
    this._intervalId = setInterval(async () => {
      console.log("[Autosave] Triggering layout state auto-save backup...");
      await this._saveFn();
    }, this._intervalMs);
  }

  public stop(): void {
    if (this._intervalId) {
      clearInterval(this._intervalId);
      this._intervalId = undefined;
    }
  }
}
