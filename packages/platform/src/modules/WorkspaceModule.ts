import { DIContainer } from "../di/DIContainer";
import { PlatformModule } from "./PlatformModule";

export class WorkspaceModule extends PlatformModule {
  public readonly name: string = "Workspace";

  public register(container: DIContainer): void {
    console.log(`Registering services for workspace module...`);
  }

  public async boot(): Promise<void> {
    console.log(`Booting WorkspaceModule...`);
  }

  public async ready(): Promise<void> {
    console.log(`WorkspaceModule is ready.`);
  }

  public async shutdown(): Promise<void> {
    console.log(`Shutting down WorkspaceModule...`);
  }
}
