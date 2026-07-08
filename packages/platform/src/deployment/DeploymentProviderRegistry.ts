import { DeploymentProvider } from "./providers/DeploymentProvider";

export class DeploymentProviderRegistry {
  private _providers: Map<string, DeploymentProvider> = new Map();
  private _isFrozen: boolean = false;

  public register(provider: DeploymentProvider): void {
    if (this._isFrozen) {
      throw new Error("Cannot register deployment provider: DeploymentProviderRegistry is frozen.");
    }
    this._providers.set(provider.name, provider);
  }

  public freeze(): void {
    this._isFrozen = true;
  }

  public get(name: string): DeploymentProvider | undefined {
    return this._providers.get(name);
  }
}
