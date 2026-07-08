export class ChangeTracker {
  private _isDirty: boolean = false;

  public markDirty(): void {
    this._isDirty = true;
  }

  public clear(): void {
    this._isDirty = false;
  }

  public get isDirty(): boolean {
    return this._isDirty;
  }
}
