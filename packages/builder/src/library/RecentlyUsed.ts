export class RecentlyUsed {
  private _recent: string[] = [];

  public trackUsed(type: string): void {
    this._recent = [type, ...this._recent.filter((t) => t !== type)].slice(0, 10);
  }

  public getRecent(): string[] {
    return this._recent;
  }
}
