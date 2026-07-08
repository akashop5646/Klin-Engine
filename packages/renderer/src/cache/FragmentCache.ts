export class FragmentCache {
  private _fragments: Map<string, string> = new Map(); // fragmentKey -> html

  public get(key: string): string | undefined {
    return this._fragments.get(key);
  }

  public set(key: string, html: string): void {
    this._fragments.set(key, html);
  }

  public invalidate(key: string): void {
    this._fragments.delete(key);
  }
}
