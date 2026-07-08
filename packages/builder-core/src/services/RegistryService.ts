import { Registry } from "@klin/registry";

export class RegistryService {
  private registry: Registry;

  constructor(registry: Registry) {
    this.registry = registry;
  }

  getRegistry(): Registry {
    return this.registry;
  }

  async resolve(type: string, id: string): Promise<any | undefined> {
    return this.registry.resolve(type, id);
  }

  search(query: any): any[] {
    return this.registry.search(query);
  }
}
