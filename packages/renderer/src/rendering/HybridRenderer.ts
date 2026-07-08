export class HybridRenderer {
  public renderHybridShell(staticShellHtml: string): string {
    return `<div data-klin-hybrid-shell="true">${staticShellHtml}</div>`;
  }
}
