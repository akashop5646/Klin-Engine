export interface PresetTokens {
  primaryColor: string;
  secondaryColor: string;
  fontFamily: string;
  borderRadius: string;
}

export class ThemePreset {
  public id: string;
  public label: string;
  public tokens: PresetTokens;

  constructor(id: string, label: string, tokens: PresetTokens) {
    this.id = id;
    this.label = label;
    this.tokens = tokens;
  }
}
