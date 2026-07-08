import { Command } from "../commands/Command";
import { CommandContext } from "../core/CommandContext";
import { CommandResult } from "../types";
import { Result, Ok, Err } from "@klin/core";
import { HookManager } from "../hooks";
import { MetricsCollector } from "../metrics/MetricsCollector";
import { HistoryManager } from "../history/HistoryManager";

export class ExecutionPipeline {
  private hooks: HookManager;
  private metrics: MetricsCollector;
  private history: HistoryManager;

  constructor(hooks: HookManager, metrics: MetricsCollector, history: HistoryManager) {
    this.hooks = hooks;
    this.metrics = metrics;
    this.history = history;
  }

  async execute(command: Command, context: CommandContext): Promise<Result<CommandResult, Error>> {
    const startTime = Date.now();

    await this.hooks.triggerBeforeValidate(command, context);
    if (command.validate) {
      const valResult = await command.validate(context);
      if (!valResult.ok) {
        this.metrics.recordExecution(Date.now() - startTime, false);
        return new Err<CommandResult, Error>(valResult.error);
      }
    }
    await this.hooks.triggerAfterValidate(command, context);

    await this.hooks.triggerBeforeExecute(command, context);

    const executeResult = await command.execute(context);
    const duration = Date.now() - startTime;

    if (!executeResult.ok) {
      this.metrics.recordExecution(duration, false);
      return new Err<CommandResult, Error>(executeResult.error);
    }

    this.history.push(command);
    this.metrics.recordExecution(duration, true);

    await this.hooks.triggerAfterExecute(command, context, executeResult.value);

    let eventsCount = 0;
    if (context.eventBus) {
      await context.eventBus.getPublisher().publish(command.name, executeResult.value, "command-engine");
      eventsCount = 1;
    }

    const commandResult: CommandResult = {
      commandId: command.id,
      success: true,
      value: executeResult.value,
      duration,
      eventsPublished: eventsCount,
      historyRecorded: !!command.undo,
    };

    return new Ok<CommandResult, Error>(commandResult);
  }
}
