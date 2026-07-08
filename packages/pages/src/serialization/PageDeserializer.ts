import type { PageContext } from "../core/PageContext";
import { PageInstance, PageFactory } from "../core/PageFactory";
import type { VersionedDocument } from "../version/DocumentVersion";
import { MigrationEngine } from "../version/MigrationEngine";
import type { PageDefinition } from "../core/PageDefinition";
import { Result, Ok, Err } from "@klin/core";

export class PageDeserializer {
  private factory = new PageFactory();
  private migrationEngine: MigrationEngine;

  constructor(migrationEngine?: MigrationEngine) {
    this.migrationEngine = migrationEngine ?? new MigrationEngine();
  }

  async deserialize(
    json: string,
    context: PageContext,
    targetSchemaVersion: string = "1.0.0"
  ): Promise<Result<PageInstance, Error>> {
    try {
      const payload: VersionedDocument = JSON.parse(json);

      if (!payload.pageId || !payload.version || !payload.data) {
        return new Err(new Error("Invalid serialized page payload structure."));
      }

      let finalPayload = payload;
      if (payload.version.schemaVersion !== targetSchemaVersion) {
        const migrationRes = await this.migrationEngine.migrate(payload, {
          schemaVersion: targetSchemaVersion,
          pageVersion: payload.version.pageVersion,
          builderVersion: "1.0.0",
          templateVersion: "1.0.0",
          blockVersion: "1.0.0",
          themeVersion: "1.0.0",
        });

        if (!migrationRes.ok) {
          return new Err(migrationRes.error);
        }
        finalPayload = migrationRes.value;
      }

      const data = finalPayload.data;
      const definition: PageDefinition = {
        manifest: data.manifest as any,
        templateId: data.templateId as string,
        route: data.route as any,
        seo: data.seo as any,
        overrides: data.overrides as any,
        permissions: data.permissions as any,
        scheduling: data.scheduling as any,
        metadata: data.metadata as any,
        aiMetadata: data.aiMetadata as any,
      };

      const createRes = this.factory.createPage(definition, context);
      if (createRes.ok && data.state) {
        const pageState = data.state as Record<string, any>;
        createRes.value.updateState({
          isPublished: !!pageState.isPublished,
          isArchived: !!pageState.isArchived,
          lastPublishedAt: pageState.lastPublishedAt as number | null,
          lastSavedAt: pageState.lastSavedAt as number | null,
        });
      }

      return createRes;
    } catch (err) {
      return new Err(err as Error);
    }
  }
}
