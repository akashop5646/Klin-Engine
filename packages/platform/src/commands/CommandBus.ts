import { Command } from "./Command";

export type CommandHandler<T extends Command = any> = (command: T) => Promise<any>;

export class CommandBus {
  private _handlers: Map<string, CommandHandler> = new Map();

  public registerHandler(commandType: string, handler: CommandHandler): void {
    this._handlers.set(commandType, handler);
  }

  public async dispatch<T extends Command>(command: T): Promise<any> {
    const handler = this._handlers.get(command.type);
    if (!handler) {
      throw new Error(`No handler registered for command: ${command.type}`);
    }
    return await handler(command);
  }
}
