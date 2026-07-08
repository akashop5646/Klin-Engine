import { Command } from "../Command";
import { CommandContext } from "../../core/CommandContext";
import { Result, Ok, generateId } from "@klin/core";

export class UpdateThemeCommand implements Command {
  readonly id = generateId("pkg");
  readonly name = "theme.changed";
  private payload: { tokens: Record<string, string> };
  private oldTokens: Record<string, string> = {};

  constructor(payload: { tokens: Record<string, string> }) {
    this.payload = payload;
  }

  async validate(_context: CommandContext): Promise<Result<void, Error>> {
    return new Ok<void, Error>(undefined);
  }

  async execute(context: CommandContext): Promise<Result<void, Error>> {
    this.oldTokens = { ...context.state.theme };
    context.state.theme = { ...context.state.theme, ...this.payload.tokens };
    return new Ok<void, Error>(undefined);
  }

  async undo(context: CommandContext): Promise<Result<void, Error>> {
    context.state.theme = this.oldTokens;
    return new Ok<void, Error>(undefined);
  }
}
