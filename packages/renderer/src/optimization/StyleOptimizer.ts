export class StyleOptimizer {
  optimizeStyles(css: string): string {
    // Basic deduplication of css selectors blocks
    return css
      .replace(/\s+/g, " ")
      .replace(/;\s*/g, ";")
      .trim();
  }
}
