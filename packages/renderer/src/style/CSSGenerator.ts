export class CSSGenerator {
  public generateRules(styles: Record<string, any>): string {
    return Object.entries(styles)
      .map(([key, val]) => `${key}: ${val};`)
      .join(" ");
  }
}
