import { MigrationPlanner } from "./MigrationPlanner";

export class MigrationRunner {
  private _planner: MigrationPlanner;

  constructor(planner: MigrationPlanner) {
    this._planner = planner;
  }

  public async runMigrations(targetSchemaVersion: string): Promise<boolean> {
    console.log(`[MigrationRunner] Starting layouts migration to schema: ${targetSchemaVersion}`);
    const steps = this._planner.plan(targetSchemaVersion);
    for (const step of steps) {
      console.log(`Running migration step: ${step}`);
    }
    return true;
  }
}
