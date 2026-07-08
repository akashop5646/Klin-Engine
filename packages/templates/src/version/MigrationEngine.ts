import { Result, Ok, Err } from "@klin/core";
import type { VersionedTemplate, TemplateVersionDescriptor } from "./TemplateVersion.ts";

export type MigrationFn = (data: Record<string, unknown>) => Record<string, unknown> | Promise<Record<string, unknown>>;

export interface MigrationStep {
  fromVersion: string;
  toVersion: string;
  migrate: MigrationFn;
}

export class MigrationEngine {
  private steps: MigrationStep[] = [];

  registerMigration(fromVersion: string, toVersion: string, migrate: MigrationFn) {
    this.steps.push({ fromVersion, toVersion, migrate });
    // Sort steps based on semver versioning flow
    this.steps.sort((a, b) => compareSemver(a.fromVersion, b.fromVersion));
  }

  async migrate(
    template: VersionedTemplate,
    targetVersion: TemplateVersionDescriptor
  ): Promise<Result<VersionedTemplate, Error>> {
    let currentData = { ...template.data };
    let currentSchemaVersion = template.version.schemaVersion;

    const targetSchemaVersion = targetVersion.schemaVersion;

    // Check if migration is necessary
    if (compareSemver(currentSchemaVersion, targetSchemaVersion) === 0) {
      return new Ok(template);
    }

    if (compareSemver(currentSchemaVersion, targetSchemaVersion) > 0) {
      return new Err(new Error(`Downgrades from version ${currentSchemaVersion} to ${targetSchemaVersion} are not supported.`));
    }

    // Apply sequential migration steps
    let migrationPathFound = true;
    while (compareSemver(currentSchemaVersion, targetSchemaVersion) < 0 && migrationPathFound) {
      const step = this.steps.find(s => compareSemver(s.fromVersion, currentSchemaVersion) === 0);
      if (!step) {
        migrationPathFound = false;
        break;
      }

      try {
        currentData = await step.migrate(currentData);
        currentSchemaVersion = step.toVersion;
      } catch (err) {
        return new Err(new Error(`Migration from ${step.fromVersion} to ${step.toVersion} failed: ${(err as Error).message}`));
      }
    }

    if (compareSemver(currentSchemaVersion, targetSchemaVersion) < 0) {
      return new Err(new Error(`No migration path found from version ${currentSchemaVersion} to ${targetSchemaVersion}.`));
    }

    return new Ok({
      version: {
        ...targetVersion,
        templateVersion: template.version.templateVersion // Keep original template version or upgrade if specified
      },
      templateId: template.templateId,
      data: currentData
    });
  }
}

// Re-export helper function from TemplateVersion
function compareSemver(a: string, b: string): number {
  const partsA = a.split(".").map(Number);
  const partsB = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const va = partsA[i] ?? 0;
    const vb = partsB[i] ?? 0;
    if (va > vb) return 1;
    if (va < vb) return -1;
  }
  return 0;
}
