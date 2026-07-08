import { DevToolsHooks } from "../hooks/DevToolsHooks";
import { CommandRegistry } from "../cli/CommandRegistry";

export class PluginAPI {
  private _hooks: DevToolsHooks;
  private _commands: CommandRegistry;

  constructor(hooks: DevToolsHooks, commands: CommandRegistry) {
    this._hooks = hooks;
    this._commands = commands;
  }

  public registerHook(name: string, callback: any): void {
    this._hooks.register(name, callback);
  }

  public registerCLICommand(cmd: any): void {
    this._commands.register(cmd);
  }
}
