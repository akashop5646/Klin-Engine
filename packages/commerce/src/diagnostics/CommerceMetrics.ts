export class CommerceMetrics {
  public activeCartsCount: number = 0;
  public checkoutRunsCount: number = 0;

  public incrementCarts(): void {
    this.activeCartsCount++;
  }

  public incrementCheckouts(): void {
    this.checkoutRunsCount++;
  }
}
