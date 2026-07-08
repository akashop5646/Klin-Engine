import { ServiceDiscovery } from "./ServiceDiscovery";

export class ServiceResolver {
  private _discovery: ServiceDiscovery;
  private _instances: Map<string, any> = new Map();

  constructor(discovery: ServiceDiscovery) {
    this._discovery = discovery;
  }

  public resolve<T>(token: string): T {
    if (this._instances.has(token)) {
      return this._instances.get(token);
    }
    const descriptor = this._discovery.find(token);
    if (!descriptor) {
      throw new Error(`Failed to resolve service descriptor token: ${token}`);
    }
    const Impl = descriptor.type;
    const instance = new Impl();
    this._instances.set(token, instance);
    return instance;
  }
}
