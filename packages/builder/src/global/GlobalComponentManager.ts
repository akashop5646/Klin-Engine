export class GlobalComponentManager {
  private _globals: Map<string, { type: string; props: Record<string, any> }> = new Map();

  public register(id: string, type: string, props: Record<string, any>): void {
    this._globals.set(id, { type, props });
  }

  public getProps(id: string): Record<string, any> | undefined {
    return this._globals.get(id)?.props;
  }

  public updateProps(id: string, updatedProps: Record<string, any>): void {
    const active = this._globals.get(id);
    if (active) {
      active.props = { ...active.props, ...updatedProps };
    }
  }
}
