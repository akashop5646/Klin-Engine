export class PluginDocs {
  public generatePluginDocs(pluginName: string, capabilities: string[]): string {
    return `# Plugin: ${pluginName}\n\n## Declared capabilities:\n${capabilities.map(c => `- ${c}`).join("\n")}\n`;
  }
}
