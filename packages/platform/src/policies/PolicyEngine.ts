export class PolicyEngine {
  public canPublish(userId: string, role: string): boolean {
    return role === "Owner" || role === "Administrator" || role === "Developer";
  }

  public canDeploy(userId: string, role: string): boolean {
    return role === "Owner" || role === "Administrator";
  }

  public canRollback(userId: string, role: string): boolean {
    return role === "Owner";
  }
}
