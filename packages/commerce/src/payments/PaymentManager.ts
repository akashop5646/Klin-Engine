import { PaymentProviderRegistry } from "./ProviderRegistry";

export class PaymentManager {
  private _registry: PaymentProviderRegistry;

  constructor(registry: PaymentProviderRegistry) {
    this._registry = registry;
  }

  public async charge(providerName: string, amount: number): Promise<boolean> {
    const provider = this._registry.get(providerName);
    if (!provider) {
      throw new Error(`Payment provider not found: ${providerName}`);
    }
    return await provider.authorizePayment(amount);
  }
}
