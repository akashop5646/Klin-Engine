export class MetadataRenderer {
  public renderMetaTags(title: string, desc: string): string {
    return `<title>${title}</title><meta name="description" content="${desc}" />`;
  }
}
