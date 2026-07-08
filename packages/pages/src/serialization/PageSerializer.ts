import type { PageInstance } from "../core/PageFactory";
import type { VersionedDocument } from "../version/DocumentVersion";
import { Result, Ok, Err } from "@klin/core";

export class PageSerializer {
  serialize(instance: PageInstance): Result<string, Error> {
    try {
      const def = instance.definition;
      const state = instance.getState();

      const payload: VersionedDocument = {
        version: {
          schemaVersion: "1.0.0",
          pageVersion: def.manifest.version,
          builderVersion: "1.0.0",
          templateVersion: "1.0.0",
          blockVersion: "1.0.0",
          themeVersion: "1.0.0",
        },
        pageId: def.manifest.id,
        data: {
          manifest: def.manifest,
          templateId: def.templateId,
          route: def.route,
          seo: def.seo,
          overrides: def.overrides,
          permissions: def.permissions,
          scheduling: def.scheduling,
          metadata: def.metadata,
          aiMetadata: def.aiMetadata,
          state: {
            isPublished: state.isPublished,
            isArchived: state.isArchived,
            lastPublishedAt: state.lastPublishedAt,
            lastSavedAt: Date.now(),
          },
        },
      };

      instance.context.eventBus?.getPublisher().publish(
        "page.saved",
        { pageId: def.manifest.id },
        "pages"
      );

      return new Ok(JSON.stringify(payload, null, 2));
    } catch (err) {
      return new Err(err as Error);
    }
  }
}
