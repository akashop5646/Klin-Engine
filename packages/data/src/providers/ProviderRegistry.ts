import { IDataProvider } from "./IDataProvider";

export class ProviderRegistry {
  private static _instance: ProviderRegistry;
  private _providers: Map<string, IDataProvider> = new Map();

  private constructor() {}

  public static getInstance(): ProviderRegistry {
    if (!ProviderRegistry._instance) {
      ProviderRegistry._instance = new ProviderRegistry();
    }
    return ProviderRegistry._instance;
  }

  public register(name: string, provider: IDataProvider): void {
    this._providers.set(name, provider);
  }

  public get(name: string): IDataProvider | undefined {
    return this._providers.get(name);
  }

  public remove(name: string): void {
    this._providers.delete(name);
  }
}
