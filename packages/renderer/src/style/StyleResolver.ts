export class StyleResolver {
  public resolveStyles(theme: Record<string, string>, responsive: any, custom: any): Record<string, any> {
    return { ...theme, ...responsive, ...custom };
  }
}
