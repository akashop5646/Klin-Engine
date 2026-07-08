import { DIContainer } from "../di/DIContainer";

export abstract class PlatformModule {
  public abstract readonly name: string;
  
  public abstract register(container: DIContainer): void;
  public abstract boot(): Promise<void>;
  public abstract ready(): Promise<void>;
  public abstract shutdown(): Promise<void>;
}
