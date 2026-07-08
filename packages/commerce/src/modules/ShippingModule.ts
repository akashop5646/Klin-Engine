import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class ShippingModule extends CommerceModule {
  public readonly name: string = "Shipping";

  public register(container: DIContainer): void {
    console.log(`Registering ShippingModule services...`);
  }
}
