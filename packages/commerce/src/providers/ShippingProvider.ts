export interface ShippingProvider {
  calculateShippingRate(zone: string): Promise<number>;
}
