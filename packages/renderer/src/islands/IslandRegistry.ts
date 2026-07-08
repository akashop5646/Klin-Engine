export class IslandRegistry {
  private _islands: Set<string> = new Set();

  constructor() {
    this._islands.add("CartWidget");
    this._islands.add("SearchBar");
    this._islands.add("NewsletterForm");
  }

  public register(type: string): void {
    this._islands.add(type);
  }

  public isIsland(type: string): boolean {
    return this._islands.has(type);
  }
}
