export class TwitterCardRenderer {
  public renderTwitterCard(title: string, desc: string, image: string): string {
    return `<meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content="${title}" /><meta name="twitter:description" content="${desc}" /><meta name="twitter:image" content="${image}" />`;
  }
}
