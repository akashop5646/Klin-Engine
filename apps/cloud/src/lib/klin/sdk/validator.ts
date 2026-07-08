import { KlinComponentDefinition } from "../types/components";
import { manifestSystem } from "../components/manifest";

export class KlinSdkValidator {
  /**
   * Scans and validates a developer's custom component definition to check compliance
   * before publishing it to the Klin marketplace or project packages.
   */
  public validateCustomComponent(def: any): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Check basic headers
    if (!def.type || typeof def.type !== "string") {
      errors.push("Component definition must specify a unique 'type' string identifier.");
    }
    if (!def.label || typeof def.label !== "string") {
      errors.push("Component definition must specify a display 'label' string.");
    }
    if (!def.category) {
      errors.push("Component definition must specify a valid category (e.g. foundation, commerce).");
    }

    // Check schema representation
    if (!def.schema || typeof def.schema !== "object") {
      errors.push("Component definition must provide a valid editor schema configuration.");
    } else {
      const schema = def.schema;
      if (!schema.fields || typeof schema.fields !== "object") {
        errors.push("Component schema must declare edit fields mapping.");
      }
      if (typeof schema.render !== "function") {
        errors.push("Component schema must supply a valid render React component function.");
      }
    }

    // Check component manifest
    if (!def.manifest || typeof def.manifest !== "object") {
      errors.push("Component definition must provide a component manifest configuration.");
    } else {
      const manifestCheck = manifestSystem.validate(def as KlinComponentDefinition);
      if (!manifestCheck.valid) {
        errors.push(...manifestCheck.errors);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const sdkValidator = new KlinSdkValidator();
