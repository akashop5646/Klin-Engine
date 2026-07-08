import { Result } from "@klin/core";
import { CommandContext } from "../core/CommandContext";

export interface Command<T = any> {
  readonly id: string;
  readonly name: string;
  execute(context: CommandContext): Promise<Result<T, Error>>;
  undo?(context: CommandContext): Promise<Result<void, Error>>;
  redo?(context: CommandContext): Promise<Result<void, Error>>;
  validate?(context: CommandContext): Promise<Result<void, Error>>;
}
