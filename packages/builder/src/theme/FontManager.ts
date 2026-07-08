export class FontManager {
  private _fonts: string[] = ["Inter", "Roboto", "Outfit", "Playfair Display"];

  public getAvailableFonts(): string[] {
    return this._fonts;
  }

  public registerFont(fontName: string): void {
    if (!this._fonts.includes(fontName)) {
      this._fonts.push(fontName);
    }
  }
}
