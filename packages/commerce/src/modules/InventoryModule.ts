import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class InventoryModule extends CommerceModule {
  public readonly name: string = "Inventory";

  public register(container: DIContainer): void {
    console.log(`Registering InventoryModule services...`);
  }
}
