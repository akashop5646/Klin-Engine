export class ConditionEngine {
  public checkCondition(rule: string, context: Record<string, any>): boolean {
    if (rule === "isLoggedIn") {
      return !!context.user?.loggedIn;
    }
    if (rule === "hasStock") {
      return context.product?.stock > 0;
    }
    return true;
  }
}
