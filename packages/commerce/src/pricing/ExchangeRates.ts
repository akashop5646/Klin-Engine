export class ExchangeRates {
  public getRate(from: string, to: string): number {
    if (from === "USD" && to === "EUR") return 0.92;
    return 1.0;
  }
}
