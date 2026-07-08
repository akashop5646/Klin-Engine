export class PlatformAggregate {
  public id: string;
  public version: number = 0;
  private _changes: any[] = [];

  constructor(id: string) {
    this.id = id;
  }

  public apply(event: any): void {
    this.version++;
    this._changes.push(event);
  }

  public get uncommittedChanges(): any[] {
    return this._changes;
  }

  public clearChanges(): void {
    this._changes = [];
  }
}
