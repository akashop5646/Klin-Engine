export class LoyaltyProgram {
  public determineTier(points: number): "Bronze" | "Silver" | "Gold" {
    if (points > 1000) return "Gold";
    if (points > 500) return "Silver";
    return "Bronze";
  }
}
