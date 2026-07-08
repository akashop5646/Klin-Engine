export class PrefetchManager {
  private _prefetchedRoutes: Set<string> = new Set();

  public prefetch(route: string): void {
    if (this._prefetchedRoutes.has(route)) return;
    this._prefetchedRoutes.add(route);
    console.log(`Prefetched layout blocks assets for route [${route}]`);
  }
}
