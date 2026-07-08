export class RuntimeContainer {
  private services = new Map<string, any>();

  public register(name: string, service: any): void {
    this.services.set(name, service);
  }

  public resolve<T = any>(name: string): T {
    const service = this.services.get(name);
    if (!service) {
      throw new Error(`[Klin Container] Service not registered: ${name}`);
    }
    return service;
  }

  public has(name: string): boolean {
    return this.services.has(name);
  }

  public clear(): void {
    this.services.clear();
  }
}
