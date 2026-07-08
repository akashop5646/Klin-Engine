export class DependencyResolver {
  public resolveDependencies(blockType: string): string[] {
    if (blockType === "Map") {
      return ["https://maps.googleapis.com/maps/api/js"];
    }
    return [];
  }
}
