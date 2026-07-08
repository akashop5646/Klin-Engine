import { BindingContext } from "./BindingContext";

export class BindingResolver {
  public static resolve(expression: string, context: BindingContext): string {
    return expression.replace(/\{\{([^}]+)\}\}/g, (_, path) => {
      const val = context.get(path.trim());
      return val !== undefined ? String(val) : "";
    });
  }
}
