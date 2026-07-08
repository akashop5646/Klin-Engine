export abstract class ConfigProvider {
  public abstract readonly name: string;
  public abstract fetchConfig(): Promise<any>;
}
