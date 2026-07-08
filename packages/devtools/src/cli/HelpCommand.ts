import { Command } from "./Command";
import { CommandRegistry } from "./CommandRegistry";

export class HelpCommand extends Command {
  public readonly name = "help";
  public readonly aliases = ["-h", "--help"];
  public readonly description = "Displays usage instructions for Klin CLI commands.";

  private _registry: CommandRegistry;

  constructor(registry: CommandRegistry) {
    super();
    this._registry = registry;
  }

  public async execute(args: string[], options: Record<string, any>): Promise<number> {
    console.log("Klin Developer Tools CLI v1.0.0");
    console.log("Usage: klin <command> [options]");
    console.log("\nAvailable Commands:");

    for (const cmd of this._registry.list()) {
      const aliasText = cmd.aliases.length ? ` (${cmd.aliases.join(", ")})` : "";
      console.log(`  klin ${cmd.name.padEnd(12)}${aliasText.padEnd(12)} - ${cmd.description}`);
    }

    return 0;
  }
}
