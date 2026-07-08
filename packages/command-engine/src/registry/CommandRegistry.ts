import { Command } from "../commands/Command";

export class CommandRegistry {
  private commands = new Map<string, new (...args: any[]) => Command>();

  register(name: string, commandClass: new (...args: any[]) => Command) {
    this.commands.set(name, commandClass);
  }

  unregister(name: string) {
    this.commands.delete(name);
  }

  replace(name: string, commandClass: new (...args: any[]) => Command) {
    this.commands.set(name, commandClass);
  }

  find(name: string): (new (...args: any[]) => Command) | undefined {
    return this.commands.get(name);
  }

  has(name: string): boolean {
    return this.commands.has(name);
  }

  list(): string[] {
    return Array.from(this.commands.keys());
  }
}
