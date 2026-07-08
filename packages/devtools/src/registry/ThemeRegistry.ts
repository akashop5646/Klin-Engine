export interface ThemeMeta {
  name: string;
  themeConfigPath: string;
}

export class ThemeRegistry {
  private _themes: Map<string, ThemeMeta> = new Map();

  public registerTheme(theme: ThemeMeta): void {
    this._themes.set(theme.name, theme);
  }

  public getTheme(name: string): ThemeMeta | undefined {
    return this._themes.get(name);
  }
}
