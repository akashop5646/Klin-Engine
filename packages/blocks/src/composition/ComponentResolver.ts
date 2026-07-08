import { Registry } from "@klin/registry";
import { Result, Ok, Err } from "@klin/core";

export class ComponentResolver {
  private registry: Registry;

  constructor(registry: Registry) {
    this.registry = registry;
  }

  async resolveComponent(id: string): Promise<Result<any, Error>> {
    // In our registry system, we fetch catalog values using registry.resolve or casting registry.engine
    // Let's resolve dynamic UI components.
    const resolved = await this.registry.resolve("component", id);
    if (!resolved) {
      // Cast check verification
      const list = (this.registry as any).engine?.catalogs?.components?.list();
      const fallback = list?.find((item: any) => item.metadata?.id === id || item.id === id);
      if (fallback) {
        return new Ok(fallback);
      }
      return new Err(new Error(`Missing dependency component: ${id}`));
    }
    return new Ok(resolved);
  }

  async validateDependencies(dependencies: string[]): Promise<Result<void, Error>> {
    for (const depId of dependencies) {
      const res = await this.resolveComponent(depId);
      if (!res.ok) {
        return new Err(new Error(`Unresolved block dependency component: ${depId}. Ensure it is registered in @klin/registry.`));
      }
    }
    return new Ok(undefined);
  }
}
