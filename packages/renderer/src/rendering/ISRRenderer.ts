export class ISRRenderer {
  private _pageAges: Map<string, number> = new Map();

  public shouldRevalidate(pageId: string, ttlMs: number): boolean {
    const age = this._pageAges.get(pageId) || 0;
    if (Date.now() - age > ttlMs) {
      this._pageAges.set(pageId, Date.now());
      return true;
    }
    return false;
  }
}
