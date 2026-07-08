export class IslandRenderer {
  public renderIslandWrapper(islandType: string, clientProps: any): string {
    return `<div data-klin-island="${islandType}" data-props='${JSON.stringify(clientProps)}'></div>`;
  }
}
