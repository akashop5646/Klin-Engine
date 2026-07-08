import { DesignState } from "../types/templates";
import { registry } from "../core/registry";

export class KlinAiRulesEngine {
  /**
   * Scans an AI generated template payload and validates compliance.
   * AI is strict:
   * - Must NEVER output raw HTML elements in sections.
   * - Must ONLY compose registered components from the registry.
   * - Must ONLY utilize theme tokens (no hardcoded color hexes inside components).
   */
  public validateAiOutput(state: DesignState): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    // Verify all components exist in the registry
    for (const page of state.pages) {
      for (const section of page.sections) {
        const compDef = registry.getComponent(section.type);
        if (!compDef) {
          errors.push(
            `[AI Rules Violation] AI generated unregistered component type "${section.type}" on page "${page.title}".`
          );
          continue;
        }

        // Check for raw HTML tags in props
        const propStr = JSON.stringify(section.props);
        if (
          /<\/?[a-z][\s\S]*>/i.test(propStr) &&
          !section.type.includes("markdown") &&
          !section.type.includes("raw-html") // Sandbox fallback check
        ) {
          errors.push(
            `[AI Rules Violation] Section "${section.id}" contains raw HTML markup in its properties, which is forbidden.`
          );
        }

        // Verify color props are mapping tokens rather than hardcoded colors
        for (const [propKey, propVal] of Object.entries(section.props)) {
          if (
            propKey.toLowerCase().includes("color") &&
            typeof propVal === "string" &&
            propVal.startsWith("#")
          ) {
            errors.push(
              `[AI Rules Violation] Property "${propKey}" on "${section.type}" uses hardcoded color "${propVal}". Use theme tokens instead.`
            );
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}

export const aiRulesEngine = new KlinAiRulesEngine();
