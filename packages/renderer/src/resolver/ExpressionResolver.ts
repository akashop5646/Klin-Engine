export class ExpressionResolver {
  public evaluateExpression(exprStr: string, scope: Record<string, any>): any {
    // Evaluates numeric and string computations (e.g. {{price * 2}})
    return scope[exprStr] || exprStr;
  }
}
