import { Command } from "./Command";

export class CommandRegistry {
  private _commands: Map<string, Command> = new Map();

  public register(command: Command): void {
    this._commands.set(command.name, command);
    for (const alias of command.aliases) {
      this._commands.set(alias, command);
    }
  }

  public get(name: string): Command | undefined {
    return this._commands.get(name);
  }

  public list(): Command[] {
    return Array.from(new Set(this._commands.values()));
  }
}
