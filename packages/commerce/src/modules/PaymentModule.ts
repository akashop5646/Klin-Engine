import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class PaymentModule extends CommerceModule {
  public readonly name: string = "Payment";

  public register(container: DIContainer): void {
    console.log(`Registering PaymentModule services...`);
  }
}
