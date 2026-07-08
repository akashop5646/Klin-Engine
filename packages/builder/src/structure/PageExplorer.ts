export class PageExplorer {
  private _pages: string[] = ["Home", "About", "Contact"];

  public getPages(): string[] {
    return this._pages;
  }

  public addPage(name: string): void {
    this._pages.push(name);
  }

  public deletePage(name: string): void {
    this._pages = this._pages.filter((p) => p !== name);
  }
}
