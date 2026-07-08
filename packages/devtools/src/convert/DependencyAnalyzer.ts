export class DependencyAnalyzer {
  public getImports(code: string): string[] {
    const importRegex = /import\s+.*\s+from\s+['"](.*)['"]/g;
    const imports: string[] = [];
    let match;
    while ((match = importRegex.exec(code)) !== null) {
      if (match[1]) {
        imports.push(match[1]);
      }
    }
    return imports;
  }
}
