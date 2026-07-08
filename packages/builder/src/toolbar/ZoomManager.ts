export class ZoomManager {
  private _scale: number = 1.0;

  public setScale(scale: number): void {
    this._scale = Math.max(0.25, Math.min(2.0, scale));
  }

  public get scale(): number {
    return this._scale;
  }
}
