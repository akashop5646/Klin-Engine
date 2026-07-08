import { registry } from "../core/registry";
import { PuckIntegrationConfig } from "../types/puck";

export class KlinPuckIntegration {
  /**
   * Translates the Klin internal components registry list to Puck's native config object.
   */
  public compilePuckConfig(onPublishCallback: PuckIntegrationConfig["onPublish"]): Record<string, any> {
    const puckComponents: Record<string, any> = {};
    const registeredComponents = registry.getAllComponents();

    for (const comp of registeredComponents) {
      const fields: Record<string, any> = {};
      
      // Map internal inspector inputs to Puck editor fields
      for (const [key, fieldDef] of Object.entries(comp.schema.fields)) {
        fields[key] = {
          type: fieldDef.type === "toggle" ? "radio" : fieldDef.type === "number" ? "number" : "text",
          label: fieldDef.label,
          defaultValue: fieldDef.defaultValue,
        };

        if (fieldDef.type === "select" && fieldDef.options) {
          fields[key].type = "select";
          fields[key].options = fieldDef.options.map((o) => ({
            label: o.label,
            value: o.value,
          }));
        }
      }

      puckComponents[comp.type] = {
        fields,
        defaultProps: comp.schema.defaultProps,
        render: comp.schema.render,
      };
    }

    return {
      components: puckComponents,
      onPublish: onPublishCallback,
    };
  }
}

export const puckIntegration = new KlinPuckIntegration();
