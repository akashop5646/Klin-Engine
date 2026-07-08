export class BuilderHints {
  public suggestImprovements(blockType: string): string[] {
    if (blockType === "Hero") {
      return ["Add an H1 heading layer", "Verify background contrast ratio is at least 4.5:1", "Set a primary CTA button link"];
    }
    return ["Add component styling guidelines"];
  }
}
