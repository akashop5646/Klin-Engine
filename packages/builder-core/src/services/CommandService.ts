import { CommandEngine, Command } from "@klin/command-engine";
import { Result } from "@klin/core";

export class CommandService {
  private commandEngine: CommandEngine;

  constructor(commandEngine: CommandEngine) {
    this.commandEngine = commandEngine;
  }

  async execute(command: Command): Promise<Result<any, Error>> {
    return this.commandEngine.execute(command);
  }

  async undo(): Promise<Result<void, Error>> {
    return this.commandEngine.undo();
  }

  async redo(): Promise<Result<void, Error>> {
    return this.commandEngine.redo();
  }
}
