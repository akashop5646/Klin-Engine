import { CommandRegistry } from "./CommandRegistry";

export class CLI {
  private _registry: CommandRegistry;

  constructor(registry: CommandRegistry) {
    this._registry = registry;
  }

  public async run(argv: string[]): Promise<number> {
    const args = argv.slice(2);
    const commandName = args[0] || "help";
    const command = this._registry.get(commandName);

    if (!command) {
      console.error(`Error: Unknown command "${commandName}"`);
      return 1;
    }

    // Parse options simply
    const parsedOptions: Record<string, any> = {};
    const commandArgs: string[] = [];

    for (let i = 1; i < args.length; i++) {
      const arg = args[i];
      if (arg.startsWith("--")) {
        const parts = arg.slice(2).split("=");
        const name = parts[0];
        const val = parts[1] !== undefined ? parts[1] : true;
        parsedOptions[name] = val;
      } else if (arg.startsWith("-")) {
        const name = arg.slice(1);
        parsedOptions[name] = true;
      } else {
        commandArgs.push(arg);
      }
    }

    try {
      return await command.execute(commandArgs, parsedOptions);
    } catch (err: any) {
      console.error(`Command execution failed: ${err.message}`);
      return 1;
    }
  }
}
