export class HistoryState {
  private _undos: string[] = [];
  private _redos: string[] = [];

  public pushState(json: string): void {
    this._undos.push(json);
    this._redos = []; // Clear redo stack on new action
  }

  public undo(currentJson: string): string | null {
    if (this._undos.length === 0) return null;
    const prev = this._undos.pop()!;
    this._redos.push(currentJson);
    return prev;
  }

  public redo(currentJson: string): string | null {
    if (this._redos.length === 0) return null;
    const next = this._redos.pop()!;
    this._undos.push(currentJson);
    return next;
  }

  public get canUndo(): boolean {
    return this._undos.length > 0;
  }

  public get canRedo(): boolean {
    return this._redos.length > 0;
  }
}
