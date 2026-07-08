export class CanvasSelection {
  private _selectedIds: string[] = [];
  private _hoveredId?: string;

  public select(ids: string[]): void {
    this._selectedIds = ids;
  }

  public hover(id?: string): void {
    this._hoveredId = id;
  }

  public getSelectedIds(): string[] {
    return this._selectedIds;
  }

  public getHoveredId(): string | undefined {
    return this._hoveredId;
  }
}
