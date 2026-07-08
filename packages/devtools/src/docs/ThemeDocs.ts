export class ThemeDocs {
  public generateThemeDocs(themeName: string, tokens: Record<string, string>): string {
    const entries = Object.entries(tokens).map(([k, v]) => `| \`${k}\` | \`${v}\` |`).join("\n");
    return `# Theme: ${themeName}\n\n| Token | Value |\n|-------|-------|\n${entries}\n`;
  }
}
