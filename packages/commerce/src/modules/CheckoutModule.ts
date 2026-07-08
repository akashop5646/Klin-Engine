import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class CheckoutModule extends CommerceModule {
  public readonly name: string = "Checkout";

  public register(container: DIContainer): void {
    console.log(`Registering CheckoutModule services...`);
  }
}
