export abstract class CommercePlugin {
  public abstract readonly pluginName: string;
  public abstract onActivate(): void;
}
