export class RegistryManager {
  private _registries: Map<string, any> = new Map();

  public register(name: string, registry: any): void {
    this._registries.set(name, registry);
  }

  public getRegistry<T>(name: string): T {
    const reg = this._registries.get(name);
    if (!reg) {
      throw new Error(`Registry not found: ${name}`);
    }
    return reg;
  }
}
