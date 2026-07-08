export class PageCache {
  private _pages: Map<string, string> = new Map(); // pageUrl -> htmlString

  public get(url: string): string | undefined {
    return this._pages.get(url);
  }

  public set(url: string, html: string): void {
    this._pages.set(url, html);
  }

  public invalidate(url: string): void {
    this._pages.delete(url);
  }
}
