export class ContractPricing {
  private _contracts: Map<string, Map<string, number>> = new Map();

  public setContractRate(companyId: string, sku: string, specialRate: number): void {
    if (!this._contracts.has(companyId)) {
      this._contracts.set(companyId, new Map());
    }
    this._contracts.get(companyId)!.set(sku, specialRate);
  }

  public getContractRate(companyId: string, sku: string): number | undefined {
    return this._contracts.get(companyId)?.get(sku);
  }
}
