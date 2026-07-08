export class Configuration {
  private settings = new Map<string, any>();

  public get(key: string, defaultValue?: any): any {
    return this.settings.has(key) ? this.settings.get(key) : defaultValue;
  }

  public set(key: string, value: any): void {
    this.settings.set(key, value);
  }
}
