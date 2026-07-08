import { KlinComponentManifest, KlinComponentDefinition } from "../types/components";
import { KlinComponentManifestSchema } from "../templates/schema";

export class KlinComponentManifestSystem {
  /**
   * Validates a component's manifest against structural constraints and fields schema.
   */
  public validate(def: KlinComponentDefinition): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // 1. Audit manifest schema structure
    const parseResult = KlinComponentManifestSchema.safeParse(def.manifest);
    if (!parseResult.success) {
      errors.push(
        `[Manifest Error] Schema validation failed: ` +
          parseResult.error.errors.map((e) => `${e.path.join(".")}: ${e.message}`).join(", ")
      );
      return { valid: false, errors };
    }

    // 2. Audit that ID match component type
    if (def.manifest.id !== def.type) {
      errors.push(`[Manifest Error] ID "${def.manifest.id}" does not match component type "${def.type}".`);
    }

    // 3. Check component's editableProps match schema fields
    const schemaFields = Object.keys(def.schema.fields);
    for (const propName of def.manifest.editableProps) {
      if (!schemaFields.includes(propName)) {
        errors.push(
          `[Manifest Error] Prop "${propName}" is declared as editable in manifest, but is missing from Puck schema fields: [${schemaFields.join(
            ", "
          )}].`
        );
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  /**
   * Generates a starter manifest configuration for a new component.
   */
  public generateDefaultManifest(id: string, name: string, category: string): KlinComponentManifest {
    return {
      id,
      name,
      category,
      version: "1.0.0",
      variants: ["Default"],
      editableProps: [],
      supportsPuck: true,
      supportsAI: true,
      supportsMarketplace: true,
    };
  }
}

export const manifestSystem = new KlinComponentManifestSystem();
