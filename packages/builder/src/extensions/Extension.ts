export interface ExtensionConfig {
  id: string;
  name: string;
  type: "Inspector" | "Toolbar" | "AI";
}

export class Extension {
  public id: string;
  public name: string;
  public type: ExtensionConfig["type"];

  constructor(config: ExtensionConfig) {
    this.id = config.id;
    this.name = config.name;
    this.type = config.type;
  }
}
