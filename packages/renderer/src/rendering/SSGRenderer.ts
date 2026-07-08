export class SSGRenderer {
  public generateStaticHtml(pageId: string, layoutTree: any): string {
    return `<!DOCTYPE html><html><head><title>${pageId}</title></head><body>${JSON.stringify(layoutTree)}</body></html>`;
  }
}
