import { CommandRegistry } from "../cli/CommandRegistry";

export class CLIDocs {
  public generateCLIDocs(registry: CommandRegistry): string {
    const commands = registry.list();
    const entries = commands.map(c => {
      const aliases = c.aliases.length ? ` (aliases: ${c.aliases.join(", ")})` : "";
      return `### \`klin ${c.name}\`${aliases}\n\n${c.description}\n`;
    }).join("\n");
    return `# Klin CLI Reference\n\n${entries}`;
  }
}
