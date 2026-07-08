export class BindingInspector {
  private _bindings: Map<string, string> = new Map(); // propPath -> dataExpression

  public bindProperty(propPath: string, dataExpression: string): void {
    this._bindings.set(propPath, dataExpression);
  }

  public unbindProperty(propPath: string): void {
    this._bindings.delete(propPath);
  }

  public getBinding(propPath: string): string | undefined {
    return this._bindings.get(propPath);
  }
}
