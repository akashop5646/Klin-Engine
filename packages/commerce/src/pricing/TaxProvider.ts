export interface TaxProvider {
  calculateTax(subtotal: number, country: string): Promise<number>;
}
