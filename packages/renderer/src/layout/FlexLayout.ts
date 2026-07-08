export class FlexLayout {
  public getFlexStyles(direction: "row" | "column", gapPx: number): Record<string, string> {
    return {
      display: "flex",
      flexDirection: direction,
      gap: `${gapPx}px`,
    };
  }
}
