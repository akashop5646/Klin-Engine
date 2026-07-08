import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class OrderModule extends CommerceModule {
  public readonly name: string = "Order";

  public register(container: DIContainer): void {
    console.log(`Registering OrderModule services...`);
  }
}
