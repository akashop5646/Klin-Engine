export class PreloadManager {
  private _preloads: Set<string> = new Set();

  public markForPreload(url: string): void {
    this._preloads.add(url);
  }

  public getPreloadLinks(): string[] {
    return Array.from(this._preloads).map((url) => `<link rel="preload" href="${url}" as="image" />`);
  }
}
