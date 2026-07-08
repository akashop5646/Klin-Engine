import { DIContainer } from "../di/DIContainer";

export abstract class CommerceModule {
  public abstract readonly name: string;
  public abstract register(container: DIContainer): void;
}
