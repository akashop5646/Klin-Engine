export class Inspector {
  private _selectedElementId?: string;

  public inspect(elementId?: string): void {
    this._selectedElementId = elementId;
  }

  public getInspectedElementId(): string | undefined {
    return this._selectedElementId;
  }
}
