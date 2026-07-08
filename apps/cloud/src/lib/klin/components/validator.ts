import { registry } from "../core/registry";

export class KlinComponentValidator {
  /**
   * Validates props for a specific component type against its registered schema.
   */
  public validateProps(type: string, props: Record<string, any>): { valid: boolean; errors: string[] } {
    const errors: string[] = [];
    const def = registry.getComponent(type);

    if (!def) {
      return { valid: false, errors: [`Component type "${type}" is not registered in Klin.`] };
    }

    const fields = def.schema.fields;

    for (const [key, fieldSpec] of Object.entries(fields)) {
      const value = props[key];

      // If value is missing and defaultValue exists, it's ok, otherwise warn
      if (value === undefined || value === null) {
        if (fieldSpec.defaultValue === undefined) {
          // Soft validation: missing required field (informational)
          errors.push(`Prop "${key}" is empty/missing on component "${type}".`);
        }
        continue;
      }

      // Type specific validation checks
      if (fieldSpec.type === "toggle" && typeof value !== "boolean") {
        errors.push(`Prop "${key}" on component "${type}" should be boolean, got ${typeof value}.`);
      }

      if (fieldSpec.type === "number" && typeof value !== "number" && isNaN(Number(value))) {
        errors.push(`Prop "${key}" on component "${type}" should be a number, got ${typeof value}.`);
      }

      if (fieldSpec.type === "select" && fieldSpec.options) {
        const allowedValues = fieldSpec.options.map((o) => o.value);
        if (!allowedValues.includes(value)) {
          errors.push(
            `Prop "${key}" on component "${type}" has value "${value}" which is not in permitted options: [${allowedValues.join(", ")}].`
          );
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const componentValidator = new KlinComponentValidator();
