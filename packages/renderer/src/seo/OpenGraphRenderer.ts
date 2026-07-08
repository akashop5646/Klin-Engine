export class OpenGraphRenderer {
  public renderOGTags(title: string, imageUrl: string, url: string): string {
    return `<meta property="og:title" content="${title}" /><meta property="og:image" content="${imageUrl}" /><meta property="og:url" content="${url}" />`;
  }
}
