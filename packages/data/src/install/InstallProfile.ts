import { CollectionConfig } from "../entities/Collection";
import { StarterContentBundle } from "../starter/StarterContent";

export interface InstallProfileConfig {
  name: string;
  collections: CollectionConfig[];
  starterContent: StarterContentBundle;
  themeVariables: Record<string, string>;
  navigation: any[];
}

export class InstallProfile {
  public readonly name: string;
  public readonly collections: CollectionConfig[];
  public readonly starterContent: StarterContentBundle;
  public readonly themeVariables: Record<string, string>;
  public readonly navigation: any[];

  constructor(config: InstallProfileConfig) {
    this.name = config.name;
    this.collections = config.collections;
    this.starterContent = config.starterContent;
    this.themeVariables = config.themeVariables;
    this.navigation = config.navigation;
  }
}
