import { DIContainer } from "../di/DIContainer";
import { PlatformModule } from "./PlatformModule";

export class PublishingModule extends PlatformModule {
  public readonly name: string = "Publishing";

  public register(container: DIContainer): void {
    console.log(`Registering services for publishing module...`);
  }

  public async boot(): Promise<void> {
    console.log(`Booting PublishingModule...`);
  }

  public async ready(): Promise<void> {
    console.log(`PublishingModule is ready.`);
  }

  public async shutdown(): Promise<void> {
    console.log(`Shutting down PublishingModule...`);
  }
}
