export class CurrencyManager {
  private _rates: Map<string, number> = new Map();

  constructor() {
    this._rates.set("EUR", 0.92);
    this._rates.set("INR", 83.5);
  }

  public convert(amount: number, toCurrency: string): number {
    const rate = this._rates.get(toCurrency) || 1.0;
    return amount * rate;
  }
}
