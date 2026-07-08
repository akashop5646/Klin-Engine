import { Command } from "../Command";
import { CommandContext } from "../../core/CommandContext";
import { Result, Ok, generateId } from "@klin/core";

export class RenameWorkspaceCommand implements Command {
  readonly id = generateId("pkg");
  readonly name = "workspace.renamed";
  private payload: { newName: string };

  constructor(payload: { newName: string }) {
    this.payload = payload;
  }

  async validate(_context: CommandContext): Promise<Result<void, Error>> {
    return new Ok<void, Error>(undefined);
  }

  async execute(_context: CommandContext): Promise<Result<string, Error>> {
    return new Ok<string, Error>(this.payload.newName);
  }
}
