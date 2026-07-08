import { Command } from "../commands/Command";
import { CommandContext } from "../core/CommandContext";

export interface CommandHooks {
  beforeValidate?(command: Command, context: CommandContext): Promise<void> | void;
  afterValidate?(command: Command, context: CommandContext): Promise<void> | void;
  beforeExecute?(command: Command, context: CommandContext): Promise<void> | void;
  afterExecute?(command: Command, context: CommandContext, result: any): Promise<void> | void;
  beforeUndo?(command: Command, context: CommandContext): Promise<void> | void;
  afterUndo?(command: Command, context: CommandContext): Promise<void> | void;
}

export class HookManager {
  private hooks: CommandHooks[] = [];

  register(hooks: CommandHooks) {
    this.hooks.push(hooks);
  }

  async triggerBeforeValidate(command: Command, context: CommandContext) {
    for (const h of this.hooks) {
      if (h.beforeValidate) await h.beforeValidate(command, context);
    }
  }

  async triggerAfterValidate(command: Command, context: CommandContext) {
    for (const h of this.hooks) {
      if (h.afterValidate) await h.afterValidate(command, context);
    }
  }

  async triggerBeforeExecute(command: Command, context: CommandContext) {
    for (const h of this.hooks) {
      if (h.beforeExecute) await h.beforeExecute(command, context);
    }
  }

  async triggerAfterExecute(command: Command, context: CommandContext, result: any) {
    for (const h of this.hooks) {
      if (h.afterExecute) await h.afterExecute(command, context, result);
    }
  }

  async triggerBeforeUndo(command: Command, context: CommandContext) {
    for (const h of this.hooks) {
      if (h.beforeUndo) await h.beforeUndo(command, context);
    }
  }

  async triggerAfterUndo(command: Command, context: CommandContext) {
    for (const h of this.hooks) {
      if (h.afterUndo) await h.afterUndo(command, context);
    }
  }
}
