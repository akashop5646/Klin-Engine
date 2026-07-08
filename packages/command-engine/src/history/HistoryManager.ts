import { Command } from "../commands/Command";

export class HistoryManager {
  private undoStack: Command[] = [];
  private redoStack: Command[] = [];

  push(command: Command) {
    if (command.undo) {
      this.undoStack.push(command);
      this.redoStack = [];
    }
  }

  popUndo(): Command | undefined {
    return this.undoStack.pop();
  }

  popRedo(): Command | undefined {
    return this.redoStack.pop();
  }

  pushRedo(command: Command) {
    this.redoStack.push(command);
  }

  pushUndo(command: Command) {
    this.undoStack.push(command);
  }

  getUndoStack(): Command[] {
    return [...this.undoStack];
  }

  getRedoStack(): Command[] {
    return [...this.redoStack];
  }

  clear() {
    this.undoStack = [];
    this.redoStack = [];
  }
}
