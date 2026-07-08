export class MigrationPlanner {
  public plan(targetVersion: string): string[] {
    return [
      `v1_to_v2_schema_layout_migration_planner`,
      `v2_to_${targetVersion}_schema_layout_migration_planner`
    ];
  }
}
