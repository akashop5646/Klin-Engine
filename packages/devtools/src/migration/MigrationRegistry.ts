export class MigrationRegistry {
  private _migrations: string[] = [];

  public register(migrationName: string): void {
    this._migrations.push(migrationName);
  }

  public getAvailable(): string[] {
    return this._migrations;
  }
}
