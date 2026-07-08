export interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: number;
}

export class SitemapManager {
  generateSitemapXml(entries: SitemapEntry[]): string {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const xmlFooter = "</urlset>";

    const xmlEntries = entries.map((entry) => {
      let item = `  <url>\n    <loc>${entry.loc}</loc>`;
      if (entry.lastmod) {
        item += `\n    <lastmod>${entry.lastmod}</lastmod>`;
      }
      if (entry.changefreq) {
        item += `\n    <changefreq>${entry.changefreq}</changefreq>`;
      }
      if (entry.priority !== undefined) {
        item += `\n    <priority>${entry.priority.toFixed(1)}</priority>`;
      }
      item += "\n  </url>";
      return item;
    });

    return `${xmlHeader}\n${xmlEntries.join("\n")}\n${xmlFooter}`;
  }
}
