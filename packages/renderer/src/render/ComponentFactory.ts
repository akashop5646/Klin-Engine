export class ComponentFactory {
  public createComponentElement(type: string, props: Record<string, any>): any {
    return { type, props };
  }
}
