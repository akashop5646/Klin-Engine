export class AutoLayout {
  public resolveAutoLayout(direction: string, gap: number, alignment: string): Record<string, string> {
    return {
      display: "flex",
      flexDirection: direction === "Vertical" ? "column" : "row",
      gap: `${gap}px`,
      alignItems: alignment === "Center" ? "center" : "stretch",
    };
  }
}
