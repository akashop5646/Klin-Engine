import { DesignState } from "../types/templates";

export class KlinTemplateMigration {
  private currentVersion = 1;

  /**
   * Migrate design state payload through multiple versions to reach current spec.
   */
  public migrate(state: any): DesignState {
    const rawVersion = state.version || 1;
    let migratedState = { ...state };

    if (rawVersion < this.currentVersion) {
      console.log(`[KlinTemplateMigration] Migrating layout state from v${rawVersion} to v${this.currentVersion}`);
      // Implement specific migration increments here
      // For instance: v1 -> v2 logic
      migratedState.version = this.currentVersion;
    }

    return migratedState as DesignState;
  }
}

export const templateMigration = new KlinTemplateMigration();
