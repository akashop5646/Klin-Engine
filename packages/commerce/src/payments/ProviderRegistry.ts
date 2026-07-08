import { PaymentProvider } from "./PaymentProvider";

export class PaymentProviderRegistry {
  private _providers: Map<string, PaymentProvider> = new Map();

  public register(provider: PaymentProvider): void {
    this._providers.set(provider.name, provider);
  }

  public get(name: string): PaymentProvider | undefined {
    return this._providers.get(name);
  }
}
