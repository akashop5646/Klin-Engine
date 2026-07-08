import { DIContainer } from "../di/DIContainer";
import { PlatformModule } from "./PlatformModule";

export class BillingModule extends PlatformModule {
  public readonly name: string = "Billing";

  public register(container: DIContainer): void {
    console.log(`Registering services for billing module...`);
  }

  public async boot(): Promise<void> {
    console.log(`Booting BillingModule...`);
  }

  public async ready(): Promise<void> {
    console.log(`BillingModule is ready.`);
  }

  public async shutdown(): Promise<void> {
    console.log(`Shutting down BillingModule...`);
  }
}
