import type { TemplateContext } from "../core/TemplateContext";
import { TemplateInstance, TemplateFactory } from "../core/TemplateFactory";
import type { VersionedTemplate } from "../version/TemplateVersion.ts";
import { MigrationEngine } from "../version/MigrationEngine";
import type { TemplateManifest } from "../contracts/TemplateManifest";
import { Result, Ok, Err } from "@klin/core";

export class TemplateDeserializer {
  private factory: TemplateFactory;
  private migrationEngine: MigrationEngine;

  constructor(context: TemplateContext, migrationEngine?: MigrationEngine) {
    this.factory = new TemplateFactory(context);
    this.migrationEngine = migrationEngine ?? new MigrationEngine();
  }

  async deserialize(
    json: string,
    targetSchemaVersion: string = "1.0.0"
  ): Promise<Result<TemplateInstance, Error>> {
    try {
      const payload: VersionedTemplate = JSON.parse(json);
      
      if (!payload.templateId || !payload.version || !payload.data) {
        return new Err(new Error("Invalid serialized template payload structure."));
      }

      // Check migration if necessary
      let finalPayload = payload;
      if (payload.version.schemaVersion !== targetSchemaVersion) {
        const migrationRes = await this.migrationEngine.migrate(payload, {
          schemaVersion: targetSchemaVersion,
          templateVersion: payload.version.templateVersion,
          builderVersion: "1.0.0"
        });

        if (!migrationRes.ok) {
          return new Err(migrationRes.error);
        }
        finalPayload = migrationRes.value;
      }

      const manifest: TemplateManifest = {
        id: finalPayload.templateId,
        name: (finalPayload.data.name as string) ?? "Imported Template",
        version: finalPayload.version.templateVersion,
        category: (finalPayload.data.category as string) ?? "General",
        requiredBlocks: (finalPayload.data.requiredBlocks as string[]) ?? [],
        builderMetadata: finalPayload.data.metadata as Record<string, any>
      };

      const layout = (finalPayload.data.layout as any[]) ?? [];

      const createRes = await this.factory.createTemplate(manifest, layout);
      return createRes;
    } catch (err) {
      return new Err(err as Error);
    }
  }
}

// Force sync language server

