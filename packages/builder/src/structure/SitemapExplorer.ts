export class SitemapExplorer {
  public generateSitemap(routes: Map<string, string>): string[] {
    return Array.from(routes.entries()).map(([pageId, path]) => `${pageId} -> ${path}`);
  }
}
