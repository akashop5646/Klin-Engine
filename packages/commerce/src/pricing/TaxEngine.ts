import { TaxProvider } from "./TaxProvider";

export class TaxEngine implements TaxProvider {
  public async calculateTax(subtotal: number, country: string): Promise<number> {
    if (country === "US") return subtotal * 0.08;
    return subtotal * 0.15; // default GST/VAT rate
  }
}
