import type { VersionedDocument, DocumentVersion } from "./DocumentVersion";
import { compareSemver } from "./DocumentVersion";
import { Result, Ok, Err } from "@klin/core";

export type PageMigrationFn = (data: Record<string, unknown>) => Record<string, unknown> | Promise<Record<string, unknown>>;

export interface PageMigrationStep {
  fromVersion: string;
  toVersion: string;
  migrate: PageMigrationFn;
}

export class MigrationEngine {
  private steps: PageMigrationStep[] = [];

  registerStep(step: PageMigrationStep): void {
    this.steps.push(step);
  }

  async migrate(
    document: VersionedDocument,
    targetVersion: DocumentVersion
  ): Promise<Result<VersionedDocument, Error>> {
    let currentDoc = { ...document, data: { ...document.data } };
    
    // Sort steps based on semver ordering of fromVersion
    const sortedSteps = [...this.steps].sort((a, b) => compareSemver(a.fromVersion, b.fromVersion));

    for (const step of sortedSteps) {
      if (
        compareSemver(currentDoc.version.schemaVersion, step.fromVersion) >= 0 &&
        compareSemver(currentDoc.version.schemaVersion, step.toVersion) < 0
      ) {
        try {
          const migratedData = await step.migrate(currentDoc.data as Record<string, unknown>);
          currentDoc.data = migratedData;
          currentDoc.version.schemaVersion = step.toVersion;
        } catch (err) {
          return new Err(new Error(`Migration step failed from ${step.fromVersion} to ${step.toVersion}: ${(err as Error).message}`));
        }
      }
    }

    if (currentDoc.version.schemaVersion !== targetVersion.schemaVersion) {
      return new Err(new Error(`No migration path found to reach target schema version ${targetVersion.schemaVersion}`));
    }

    return new Ok(currentDoc);
  }
}
