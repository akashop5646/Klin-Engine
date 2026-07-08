import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class CustomerModule extends CommerceModule {
  public readonly name: string = "Customer";

  public register(container: DIContainer): void {
    console.log(`Registering CustomerModule services...`);
  }
}
