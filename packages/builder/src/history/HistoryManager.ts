export class HistoryManager {
  private _undoStack: any[] = [];
  private _redoStack: any[] = [];

  public pushSnapshot(snapshot: any): void {
    this._undoStack.push(snapshot);
    this._redoStack = []; // Reset redo
  }

  public undo(current: any): any {
    if (this._undoStack.length === 0) return current;
    const prev = this._undoStack.pop();
    this._redoStack.push(current);
    return prev;
  }

  public redo(current: any): any {
    if (this._redoStack.length === 0) return current;
    const next = this._redoStack.pop();
    this._undoStack.push(current);
    return next;
  }
}
