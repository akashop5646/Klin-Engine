export class ComponentDocs {
  public generateComponentDocs(name: string, props: string[]): string {
    return `# Block Component: ${name}\n\n## Properties:\n${props.map(p => `- \`${p}\``).join("\n")}\n`;
  }
}
