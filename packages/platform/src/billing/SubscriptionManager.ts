export class SubscriptionManager {
  private _plans: Map<string, string> = new Map();

  public subscribe(workspaceId: string, planTier: string): void {
    this._plans.set(workspaceId, planTier);
  }

  public getPlan(workspaceId: string): string {
    return this._plans.get(workspaceId) || "Free";
  }

  public checkLimit(workspaceId: string, limitName: string, count: number): boolean {
    const plan = this.getPlan(workspaceId);
    if (plan === "Free" && count > 5) {
      return false; // Limit exceeded for free plans
    }
    return true;
  }
}
