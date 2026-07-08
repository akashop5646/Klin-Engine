import { ComponentSchema } from "@klin/ui";
import { BuilderSchema, BuilderField, BuilderFieldType } from "./types";

export class BuilderSchemaMapper {
  static map(schema: ComponentSchema, metadata?: any): BuilderSchema {
    return {
      componentId: schema.componentId,
      name: metadata?.name || schema.componentId,
      description: metadata?.description,
      category: metadata?.category || "General",
      fields: schema.fields.map((field) => {
        let type: BuilderFieldType = "text";
        
        switch (field.type) {
          case "string":
            type = "text";
            break;
          case "number":
            type = "number";
            break;
          case "boolean":
            type = "boolean";
            break;
          case "select":
            type = "select";
            break;
          case "color":
            type = "color";
            break;
          case "icon":
            type = "icon";
            break;
          case "url":
            type = "link";
            break;
          case "custom":
            type = "text"; // Fallback
            break;
          default:
            type = "text";
        }

        const builderField: BuilderField = {
          id: field.key,
          type,
          label: field.label,
          defaultValue: field.defaultValue,
          options: field.options,
          validation: {
            required: field.required,
            min: field.validation?.min,
            max: field.validation?.max,
            pattern: field.validation?.pattern,
            message: field.validation?.message,
          },
          ui: {
            group: field.group,
            order: field.order,
            helpText: field.description,
          },
        };

        return builderField;
      }),
    };
  }
}
