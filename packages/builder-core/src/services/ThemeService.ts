import { ThemeEngine } from "@klin/theme";

export class ThemeService {
  private themeEngine: ThemeEngine;

  constructor(themeEngine: ThemeEngine) {
    this.themeEngine = themeEngine;
  }

  async getThemeEngine(): Promise<ThemeEngine> {
    return this.themeEngine;
  }

  async compile(theme: any): Promise<string> {
    return this.themeEngine.compile(theme);
  }

  async apply(theme: any, context: any): Promise<string> {
    return this.themeEngine.apply(theme, context);
  }

  async switchTheme(newTheme: any, context: any): Promise<string> {
    return this.themeEngine.switch(newTheme, context);
  }
}
