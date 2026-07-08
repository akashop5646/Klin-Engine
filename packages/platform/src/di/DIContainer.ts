export type Lifetime = "Singleton" | "Transient" | "Scoped";

export interface ServiceDescriptor {
  token: string;
  implementation: any;
  lifetime: Lifetime;
}

export class DIContainer {
  private _descriptors: Map<string, ServiceDescriptor> = new Map();
  private _singletons: Map<string, any> = new Map();

  public register(token: string, implementation: any, lifetime: Lifetime = "Singleton"): void {
    this._descriptors.set(token, { token, implementation, lifetime });
  }

  public resolve<T>(token: string): T {
    const descriptor = this._descriptors.get(token);
    if (!descriptor) {
      throw new Error(`Service not registered for token: ${token}`);
    }

    if (descriptor.lifetime === "Singleton") {
      if (!this._singletons.has(token)) {
        const Impl = descriptor.implementation;
        this._singletons.set(token, new Impl(this));
      }
      return this._singletons.get(token);
    }

    const Impl = descriptor.implementation;
    return new Impl(this);
  }
}
