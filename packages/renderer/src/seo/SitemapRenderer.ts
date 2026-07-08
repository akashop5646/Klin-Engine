export class SitemapRenderer {
  public generateXmlSitemap(urls: string[]): string {
    const xmlItems = urls
      .map((u) => `<url><loc>${u}</loc></url>`)
      .join("\n");
    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlItems}\n</urlset>`;
  }
}
