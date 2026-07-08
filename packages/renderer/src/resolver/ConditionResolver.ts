export class ConditionResolver {
  public resolveCondition(rule: string, scope: Record<string, any>): boolean {
    if (rule === "isLoggedIn") {
      return !!scope.user?.loggedIn;
    }
    return true;
  }
}
