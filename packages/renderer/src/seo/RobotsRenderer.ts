export class RobotsRenderer {
  public generateRobotsTxt(sitemapUrl: string): string {
    return `User-agent: *\nAllow: /\nSitemap: ${sitemapUrl}`;
  }
}
