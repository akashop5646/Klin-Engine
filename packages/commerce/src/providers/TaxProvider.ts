import { TaxProvider as CommerceTaxProvider } from "../pricing/TaxProvider";

export interface ExternalTaxProvider extends CommerceTaxProvider {
  calculateTaxRate?(subtotal: number): number;
}
