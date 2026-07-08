import { KlinComponentDefinition } from "../types/components";
import { manifestSystem } from "../components/manifest";

export class KlinRegistry {
  private static instance: KlinRegistry | null = null;
  private components: Map<string, KlinComponentDefinition> = new Map();

  private constructor() {}

  public static getInstance(): KlinRegistry {
    if (!KlinRegistry.instance) {
      KlinRegistry.instance = new KlinRegistry();
    }
    return KlinRegistry.instance;
  }

  public registerComponent(def: KlinComponentDefinition): void {
    if (this.components.has(def.type)) {
      console.warn(`[KlinRegistry] Component of type "${def.type}" is already registered. Overwriting.`);
    }

    // Verify component manifest
    const manifestCheck = manifestSystem.validate(def);
    if (!manifestCheck.valid) {
      console.error(
        `[KlinRegistry] Component "${def.type}" manifest is invalid and registration contains errors:\n` +
          manifestCheck.errors.map((e) => `- ${e}`).join("\n")
      );
    }

    this.components.set(def.type, def);
  }

  public getComponent(type: string): KlinComponentDefinition | undefined {
    return this.components.get(type);
  }

  public getAllComponents(): KlinComponentDefinition[] {
    return Array.from(this.components.values());
  }

  public clearRegistry(): void {
    this.components.clear();
  }
}

export const registry = KlinRegistry.getInstance();
