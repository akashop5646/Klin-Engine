export class ExpressionEngine {
  public evaluate(expression: string, context: Record<string, any>): any {
    // Parse expression e.g. {{product.price * 2}}
    const clean = expression.replace(/[{}]/g, "").trim();
    if (!clean) return undefined;

    try {
      // Basic evaluator helper
      const parts = clean.split(".");
      let current = context;
      for (const part of parts) {
        if (current === undefined || current === null) return undefined;
        current = current[part];
      }
      return current !== undefined ? current : expression;
    } catch {
      return expression;
    }
  }
}
