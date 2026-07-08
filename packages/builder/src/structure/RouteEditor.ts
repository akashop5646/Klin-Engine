export class RouteEditor {
  private _routes: Map<string, string> = new Map(); // pageId -> path

  public setRoute(pageId: string, path: string): void {
    this._routes.set(pageId, path);
  }

  public getRoute(pageId: string): string | undefined {
    return this._routes.get(pageId);
  }
}
