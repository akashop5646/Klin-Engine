import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class AutomationModule extends CommerceModule {
  public readonly name: string = "Automation";

  public register(container: DIContainer): void {
    console.log(`Registering AutomationModule services...`);
  }
}
