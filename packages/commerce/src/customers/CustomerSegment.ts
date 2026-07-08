export class CustomerSegment {
  public matchSegment(ordersCount: number): "VIP" | "Standard" {
    if (ordersCount > 10) return "VIP";
    return "Standard";
  }
}
