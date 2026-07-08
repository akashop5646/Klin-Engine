export class APIGenerator {
  public generateApiDocs(endpoints: string[]): string {
    return `# API Endpoints Reference\n\n${endpoints.map(e => `### ${e}\nExposes workspace configurations properties.`).join("\n\n")}\n`;
  }
}
