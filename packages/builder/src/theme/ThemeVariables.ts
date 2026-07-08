export class ThemeVariables {
  public static compileToCSS(tokens: Record<string, string>): string {
    const rules = Object.entries(tokens)
      .map(([key, val]) => `--klin-${key}: ${val};`)
      .join("\n  ");
    return `:root {\n  ${rules}\n}`;
  }
}
