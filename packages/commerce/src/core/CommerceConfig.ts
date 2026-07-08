export interface CommerceConfigOptions {
  multiCurrency: boolean;
  defaultTaxRate: number;
  inventoryThrottling: boolean;
  b2bApprovalFlow: boolean;
}

export class CommerceConfig {
  public readonly multiCurrency: boolean;
  public readonly defaultTaxRate: number;
  public readonly inventoryThrottling: boolean;
  public readonly b2bApprovalFlow: boolean;

  constructor(options: CommerceConfigOptions) {
    this.multiCurrency = options.multiCurrency;
    this.defaultTaxRate = options.defaultTaxRate;
    this.inventoryThrottling = options.inventoryThrottling;
    this.b2bApprovalFlow = options.b2bApprovalFlow;
  }
}
