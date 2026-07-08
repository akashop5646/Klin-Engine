export class BindingExpression {
  public static parse(expression: string): string[] {
    const matches = expression.match(/\{\{([^}]+)\}\}/g);
    if (!matches) return [];
    return matches.map((m) => m.slice(2, -2).trim());
  }

  public static isBinding(val: any): boolean {
    if (typeof val !== "string") return false;
    return /\{\{([^}]+)\}\}/.test(val);
  }
}
