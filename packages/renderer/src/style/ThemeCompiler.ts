export class ThemeCompiler {
  public static compile(themeTokens: Record<string, string>): string {
    const cssVars = Object.entries(themeTokens)
      .map(([key, val]) => `--klin-${key}: ${val};`)
      .join("\n");
    return `:root {\n${cssVars}\n}`;
  }
}
