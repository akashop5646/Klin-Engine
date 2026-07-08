import { Command } from "../commands/Command";

export class CommandQueue {
  private immediate: Command[] = [];
  private background: Command[] = [];
  private transaction: Command[] = [];

  pushImmediate(command: Command) {
    this.immediate.push(command);
  }

  pushBackground(command: Command) {
    this.background.push(command);
  }

  pushTransaction(command: Command) {
    this.transaction.push(command);
  }

  popImmediate(): Command | undefined {
    return this.immediate.shift();
  }

  popBackground(): Command | undefined {
    return this.background.shift();
  }

  popTransaction(): Command | undefined {
    return this.transaction.shift();
  }

  getImmediateSize(): number {
    return this.immediate.length;
  }

  getBackgroundSize(): number {
    return this.background.length;
  }

  getTransactionSize(): number {
    return this.transaction.length;
  }
}
