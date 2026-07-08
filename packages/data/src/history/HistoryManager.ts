export interface HistoryState {
  actionName: string;
  undo: () => void;
  redo: () => void;
}

export class HistoryManager {
  private _undoStack: HistoryState[] = [];
  private _redoStack: HistoryState[] = [];

  public execute(state: HistoryState): void {
    state.redo();
    this._undoStack.push(state);
    this._redoStack = []; // clear redo on new action
  }

  public undo(): void {
    const state = this._undoStack.pop();
    if (state) {
      state.undo();
      this._redoStack.push(state);
    }
  }

  public redo(): void {
    const state = this._redoStack.pop();
    if (state) {
      state.redo();
      this._undoStack.push(state);
    }
  }

  public getUndoActions(): string[] {
    return this._undoStack.map((a) => a.actionName);
  }

  public getRedoActions(): string[] {
    return this._redoStack.map((a) => a.actionName);
  }
}
