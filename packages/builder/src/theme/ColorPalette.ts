export class ColorPalette {
  private _colors: string[] = ["#000000", "#ffffff", "#3b82f6", "#ef4444", "#10b981", "#f59e0b"];

  public getColors(): string[] {
    return this._colors;
  }

  public addColor(colorHex: string): void {
    this._colors.push(colorHex);
  }
}
