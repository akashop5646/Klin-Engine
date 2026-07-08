export interface ICommand {
  execute(): void;
  undo(): void;
}

export class CommandManager {
  private _history: ICommand[] = [];
  private _currentIndex: number = -1;

  public execute(command: ICommand): void {
    // Truncate redo history
    this._history = this._history.slice(0, this._currentIndex + 1);
    command.execute();
    this._history.push(command);
    this._currentIndex++;
  }

  public undo(): void {
    if (this._currentIndex >= 0) {
      this._history[this._currentIndex].undo();
      this._currentIndex--;
    }
  }

  public redo(): void {
    if (this._currentIndex < this._history.length - 1) {
      this._currentIndex++;
      this._history[this._currentIndex].execute();
    }
  }
}
