import { DIContainer } from "../di/DIContainer";
import { CommerceModule } from "./CommerceModule";

export class CatalogModule extends CommerceModule {
  public readonly name: string = "Catalog";

  public register(container: DIContainer): void {
    console.log(`Registering CatalogModule services...`);
  }
}
