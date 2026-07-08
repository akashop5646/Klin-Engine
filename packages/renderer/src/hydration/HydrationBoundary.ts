export class HydrationBoundary {
  wrapStaticElement(html: string, islandId: string): string {
    return `<div data-klin-island="${islandId}">${html}</div>`;
  }
}
