export class LayerSelection {
  private _activeLayerId?: string;

  public get activeLayerId(): string | undefined {
    return this._activeLayerId;
  }

  public selectLayer(layerId?: string): void {
    this._activeLayerId = layerId;
  }
}
