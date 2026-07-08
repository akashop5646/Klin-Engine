export class QuoteManager {
  private _quotes: Map<string, number> = new Map();

  public submitQuote(quoteId: string, offerAmount: number): void {
    this._quotes.set(quoteId, offerAmount);
  }

  public getQuote(quoteId: string): number | undefined {
    return this._quotes.get(quoteId);
  }
}
