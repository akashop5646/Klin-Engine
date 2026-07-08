import { PresetTokens } from "./ThemePreset";

export class ThemeEditor {
  private _tokens: Record<string, string> = {};

  public updateToken(key: string, value: string): void {
    this._tokens[key] = value;
  }

  public getTokens(): Record<string, string> {
    return this._tokens;
  }

  public applyPreset(tokens: PresetTokens): void {
    this._tokens = {
      primaryColor: tokens.primaryColor,
      secondaryColor: tokens.secondaryColor,
      fontFamily: tokens.fontFamily,
      borderRadius: tokens.borderRadius,
    };
  }
}
