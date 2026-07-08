import { BuilderField } from "./types";

export class PuckFieldMapper {
  static mapField(field: BuilderField): any {
    switch (field.type) {
      case "text":
        return { type: "text", label: field.label };
      case "textarea":
        return { type: "textarea", label: field.label };
      case "number":
        return { type: "number", label: field.label };
      case "boolean":
        return {
          type: "select",
          label: field.label,
          options: [
            { label: "Yes", value: true as any },
            { label: "No", value: false as any },
          ],
        };
      case "select":
        return {
          type: "select",
          label: field.label,
          options: field.options || [],
        };
      case "color":
        // For color fields in Puck, standard is text or custom color field.
        // We'll return a text input for simple integration, extensible in custom field renderers.
        return { type: "text", label: field.label };
      case "icon":
        return { type: "text", label: field.label };
      case "link":
        return { type: "text", label: field.label };
      case "repeater":
      case "array":
        return {
          type: "array",
          label: field.label,
          arrayFields: this.mapFields(field.fields || []),
        };
      case "object":
        return {
          type: "object",
          label: field.label,
          objectFields: this.mapFields(field.fields || []),
        };
      default:
        return { type: "text", label: field.label };
    }
  }

  static mapFields(fields: BuilderField[]): Record<string, any> {
    const puckFields: Record<string, any> = {};
    for (const field of fields) {
      puckFields[field.id] = this.mapField(field);
    }
    return puckFields;
  }
}
