import { ServiceDescriptor } from "./ServiceDescriptor";

export class ServiceDiscovery {
  private _services: Map<string, ServiceDescriptor> = new Map();
  private _isFrozen: boolean = false;

  public register(descriptor: ServiceDescriptor): void {
    if (this._isFrozen) {
      throw new Error("Cannot register service descriptor: ServiceDiscovery is frozen.");
    }
    this._services.set(descriptor.token, descriptor);
  }

  public freeze(): void {
    this._isFrozen = true;
  }

  public find(token: string): ServiceDescriptor | undefined {
    return this._services.get(token);
  }

  public list(): ServiceDescriptor[] {
    return Array.from(this._services.values());
  }
}
