export interface CourierProvider {
  readonly name: string;
  calculateRates(weight: number): Promise<number>;
}
