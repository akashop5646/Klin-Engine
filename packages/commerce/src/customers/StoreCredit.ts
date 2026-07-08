export class StoreCredit {
  private _credits: Map<string, number> = new Map();

  public addCredit(customerId: string, amount: number): void {
    const current = this._credits.get(customerId) || 0;
    this._credits.set(customerId, current + amount);
  }

  public deductCredit(customerId: string, amount: number): boolean {
    const current = this._credits.get(customerId) || 0;
    if (current < amount) return false;
    this._credits.set(customerId, current - amount);
    return true;
  }
}
