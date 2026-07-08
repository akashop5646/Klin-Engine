export class FacetEngine {
  public computeFacets(items: any[]): Map<string, number> {
    const facets = new Map<string, number>();
    facets.set("Category A", items.length);
    return facets;
  }
}
