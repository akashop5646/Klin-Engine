export class VariableResolver {
  public resolveVariable(key: string, variables: Record<string, any>): any {
    return variables[key];
  }
}
