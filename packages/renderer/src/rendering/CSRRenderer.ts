export class CSRRenderer {
  public renderToDOM(element: HTMLElement, layoutTree: any): void {
    element.innerHTML = `<div>CSR Element Compiled: ${JSON.stringify(layoutTree)}</div>`;
  }
}
