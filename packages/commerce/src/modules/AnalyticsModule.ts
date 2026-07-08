import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class AnalyticsModule extends CommerceModule {
  public readonly name: string = "Analytics";

  public register(container: DIContainer): void {
    console.log(`Registering AnalyticsModule services...`);
  }
}
