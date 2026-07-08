export class MovementLog {
  public logMovement(sku: string, qty: number, type: "IN" | "OUT"): void {
    console.log(`Stock Movement [${type}] for ${sku}: ${qty}`);
  }
}
