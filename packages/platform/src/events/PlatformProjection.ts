export abstract class PlatformProjection {
  public abstract readonly name: string;
  public abstract handleEvent(event: any): void;
}
