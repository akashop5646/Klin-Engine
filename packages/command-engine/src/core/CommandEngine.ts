import { CommandRegistry } from "../registry/CommandRegistry";
import { CommandQueue } from "../queue/CommandQueue";
import { HistoryManager } from "../history/HistoryManager";
import { TransactionManager } from "../transactions/TransactionManager";
import { MetricsCollector } from "../metrics/MetricsCollector";
import { HookManager } from "../hooks";
import { Inspector } from "../debug/Inspector";
import { CommandExecutor } from "./CommandExecutor";
import { ExecutionPipeline } from "../pipeline/ExecutionPipeline";
import { Command } from "../commands/Command";
import { CommandContext } from "./CommandContext";
import { CommandResult } from "../types";
import { Result, Ok, Err } from "@klin/core";

export class CommandEngine {
  readonly registry = new CommandRegistry();
  readonly queue = new CommandQueue();
  readonly history = new HistoryManager();
  readonly transactions = new TransactionManager();
  readonly metrics = new MetricsCollector();
  readonly hooks = new HookManager();
  readonly inspector: Inspector;

  private executor: CommandExecutor;
  private pipeline: ExecutionPipeline;
  private context: CommandContext;

  constructor(context: CommandContext) {
    this.context = context;
    this.inspector = new Inspector(this.metrics, this.history);
    this.pipeline = new ExecutionPipeline(this.hooks, this.metrics, this.history);
    this.executor = new CommandExecutor(this.pipeline);
  }

  async execute(command: Command): Promise<Result<CommandResult, Error>> {
    if (this.transactions.inTransaction()) {
      const res = await this.transactions.executeCommandInTransaction(command, this.context);
      if (!res.ok) {
        return new Err<CommandResult, Error>(res.error);
      }
      const commandResult: CommandResult = {
        commandId: command.id,
        success: true,
        value: res.value,
        duration: 0,
        eventsPublished: 0,
        historyRecorded: false,
      };
      return new Ok<CommandResult, Error>(commandResult);
    }

    this.queue.pushImmediate(command);
    const cmd = this.queue.popImmediate();
    if (cmd) {
      return this.executor.execute(cmd, this.context);
    }
    return new Err<CommandResult, Error>(new Error("No command in queue"));
  }

  async undo(): Promise<Result<void, Error>> {
    const cmd = this.history.popUndo();
    if (cmd && cmd.undo) {
      await this.hooks.triggerBeforeUndo(cmd, this.context);
      const res = await cmd.undo(this.context);
      await this.hooks.triggerAfterUndo(cmd, this.context);
      if (res.ok) {
        this.history.pushRedo(cmd);
        this.metrics.recordUndo();
        return new Ok<void, Error>(undefined);
      }
      return res;
    }
    return new Err<void, Error>(new Error("No undo command found"));
  }

  async redo(): Promise<Result<void, Error>> {
    const cmd = this.history.popRedo();
    if (cmd) {
      const res = await this.executor.execute(cmd, this.context);
      if (res.ok) {
        this.metrics.recordRedo();
        return new Ok<void, Error>(undefined);
      }
      return new Err<void, Error>(res.error);
    }
    return new Err<void, Error>(new Error("No redo command found"));
  }
}
