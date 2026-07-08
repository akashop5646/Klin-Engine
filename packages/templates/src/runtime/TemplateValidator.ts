import { TemplateManifest } from "../contracts/TemplateManifest";
import { Result, Ok, Err } from "@klin/core";

export class TemplateValidator {
  validate(layout: any[], manifest: TemplateManifest): Result<void, Error> {
    if (manifest.requiredBlocks) {
      const layoutIds = new Set(layout.map((n) => n.blockId));
      for (const reqBlock of manifest.requiredBlocks) {
        if (!layoutIds.has(reqBlock)) {
          return new Err(new Error(`Missing required block parameter inside layout: ${reqBlock}`));
        }
      }
    }
    return new Ok(undefined);
  }
}
