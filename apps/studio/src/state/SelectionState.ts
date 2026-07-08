export class SelectionState {
  private _selectedNodeIds: Set<string> = new Set();

  public select(id: string): void {
    this._selectedNodeIds.clear();
    this._selectedNodeIds.add(id);
    console.log(`Selected layout block node: ${id}`);
  }

  public deselectAll(): void {
    this._selectedNodeIds.clear();
  }

  public get selectedIds(): string[] {
    return Array.from(this._selectedNodeIds);
  }

  public isSelected(id: string): boolean {
    return this._selectedNodeIds.has(id);
  }
}
