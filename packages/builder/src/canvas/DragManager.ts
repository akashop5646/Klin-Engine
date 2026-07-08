export class DragManager {
  private _isDragging: boolean = false;
  private _draggedBlockId?: string;

  public startDrag(blockId: string): void {
    this._isDragging = true;
    this._draggedBlockId = blockId;
  }

  public endDrag(): void {
    this._isDragging = false;
    this._draggedBlockId = undefined;
  }

  public get draggedBlockId(): string | undefined {
    return this._draggedBlockId;
  }
}
