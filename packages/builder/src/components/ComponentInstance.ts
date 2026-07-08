export class ComponentInstance {
  public id: string;
  public blueprintId: string;
  public propertiesOverride: Record<string, any>;

  constructor(id: string, blueprintId: string, overrides: Record<string, any> = {}) {
    this.id = id;
    this.blueprintId = blueprintId;
    this.propertiesOverride = overrides;
  }
}
