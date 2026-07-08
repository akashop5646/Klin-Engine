export class GridLayout {
  public getGridStyles(colsCount: number, gapPx: number): Record<string, string> {
    return {
      display: "grid",
      gridTemplateColumns: `repeat(${colsCount}, minmax(0, 1fr))`,
      gap: `${gapPx}px`,
    };
  }
}
