import { BlockManifest } from "../contracts/BlockManifest";
import { Result, Ok, Err } from "@klin/core";

export class BlockValidator {
  validate(props: Record<string, any>, manifest: BlockManifest): Result<void, Error> {
    // Standard properties validation check
    if (manifest.requiredComponents) {
      for (const component of manifest.requiredComponents) {
        if (!component) {
          return new Err(new Error(`Invalid dependency specification inside block manifest: ${manifest.id}`));
        }
      }
    }
    return new Ok(undefined);
  }
}
