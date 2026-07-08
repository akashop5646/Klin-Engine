import { DIContainer } from "../di/DIContainer";
import { PlatformModule } from "./PlatformModule";

export class DeploymentModule extends PlatformModule {
  public readonly name: string = "Deployment";

  public register(container: DIContainer): void {
    console.log(`Registering services for deployment module...`);
  }

  public async boot(): Promise<void> {
    console.log(`Booting DeploymentModule...`);
  }

  public async ready(): Promise<void> {
    console.log(`DeploymentModule is ready.`);
  }

  public async shutdown(): Promise<void> {
    console.log(`Shutting down DeploymentModule...`);
  }
}
