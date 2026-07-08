export class SSRRenderer {
  public renderToString(layoutTree: any): string {
    return `<div id="klin-ssr-root">${JSON.stringify(layoutTree)}</div>`;
  }
}
