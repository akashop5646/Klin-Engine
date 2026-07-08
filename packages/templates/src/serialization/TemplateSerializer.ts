import { TemplateInstance } from "../core/TemplateFactory";
import type { VersionedTemplate } from "../version/TemplateVersion.ts";
import { Result, Ok, Err } from "@klin/core";

export class TemplateSerializer {
  serialize(instance: TemplateInstance): Result<string, Error> {
    try {
      const metadata = instance.context.eventBus ? { serializedAt: Date.now() } : {};
      
      const payload: VersionedTemplate = {
        version: {
          schemaVersion: "1.0.0",
          templateVersion: instance.manifest.version,
          builderVersion: "1.0.0"
        },
        templateId: instance.manifest.id,
        data: {
          name: instance.manifest.name,
          category: instance.manifest.category,
          requiredBlocks: instance.manifest.requiredBlocks ?? [],
          layout: instance.getLayout(),
          metadata: {
            ...instance.manifest.builderMetadata,
            ...metadata
          }
        }
      };

      instance.context.eventBus?.getPublisher().publish(
        "template.serialized",
        { templateId: instance.manifest.id },
        "templates"
      );

      return new Ok(JSON.stringify(payload, null, 2));
    } catch (err) {
      return new Err(err as Error);
    }
  }
}

// Force sync language server

