export class DocumentationGenerator {
  public generateDocsSummary(title: string, sections: string[]): string {
    return `# ${title}\n\n## Table of Contents:\n${sections.map(s => `- ${s}`).join("\n")}\n`;
  }
}
