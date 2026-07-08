import { Command } from "../commands/Command";
import { CommandContext } from "./CommandContext";
import { ExecutionPipeline } from "../pipeline/ExecutionPipeline";
import { CommandResult } from "../types";
import { Result } from "@klin/core";

export class CommandExecutor {
  private pipeline: ExecutionPipeline;

  constructor(pipeline: ExecutionPipeline) {
    this.pipeline = pipeline;
  }

  async execute(command: Command, context: CommandContext): Promise<Result<CommandResult, Error>> {
    return this.pipeline.execute(command, context);
  }
}
