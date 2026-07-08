export class ProviderRegistry {
  private _providers: Map<string, any> = new Map();

  public register(type: string, name: string, provider: any): void {
    const key = `${type}:${name}`;
    this._providers.set(key, provider);
  }

  public get(type: string, name: string): any {
    return this._providers.get(`${type}:${name}`);
  }
}
