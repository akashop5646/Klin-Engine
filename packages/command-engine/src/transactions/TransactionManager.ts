import { Command } from "../commands/Command";
import { CommandContext } from "../core/CommandContext";
import { Result, Ok, Err } from "@klin/core";

export class TransactionManager {
  private activeTransactionCommands: Command[] = [];
  private isInsideTransaction = false;

  begin() {
    this.isInsideTransaction = true;
    this.activeTransactionCommands = [];
  }

  async executeCommandInTransaction(
    command: Command,
    context: CommandContext
  ): Promise<Result<any, Error>> {
    const result = await command.execute(context);
    if (!result.ok) {
      await this.rollback(context);
      return result;
    }

    if (command.undo) {
      this.activeTransactionCommands.push(command);
    }
    return result;
  }

  async commit(): Promise<Command[]> {
    this.isInsideTransaction = false;
    const committed = [...this.activeTransactionCommands];
    this.activeTransactionCommands = [];
    return committed;
  }

  async rollback(context: CommandContext): Promise<void> {
    this.isInsideTransaction = false;
    for (let i = this.activeTransactionCommands.length - 1; i >= 0; i--) {
      const cmd = this.activeTransactionCommands[i];
      if (cmd.undo) {
        await cmd.undo(context);
      }
    }
    this.activeTransactionCommands = [];
  }

  inTransaction(): boolean {
    return this.isInsideTransaction;
  }
}
