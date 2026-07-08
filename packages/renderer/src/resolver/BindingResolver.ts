export class BindingResolver {
  public resolveBinding(expression: string, context: Record<string, any>): any {
    const clean = expression.replace(/[{}]/g, "").trim();
    const parts = clean.split(".");
    let current = context;
    for (const part of parts) {
      if (current === undefined || current === null) return undefined;
      current = current[part];
    }
    return current;
  }
}
