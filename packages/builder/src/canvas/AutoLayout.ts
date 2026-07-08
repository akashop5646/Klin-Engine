export type AutoLayoutDirection = "Vertical" | "Horizontal";

export interface AutoLayoutConfig {
  direction: AutoLayoutDirection;
  gap: number;
  wrap: boolean;
  alignItems: "flex-start" | "center" | "flex-end" | "stretch";
  justifyContent: "flex-start" | "center" | "flex-end" | "space-between";
}

export class AutoLayout {
  public direction: AutoLayoutDirection;
  public gap: number;
  public wrap: boolean;
  public alignItems: AutoLayoutConfig["alignItems"];
  public justifyContent: AutoLayoutConfig["justifyContent"];

  constructor(config: AutoLayoutConfig) {
    this.direction = config.direction;
    this.gap = config.gap;
    this.wrap = config.wrap;
    this.alignItems = config.alignItems;
    this.justifyContent = config.justifyContent;
  }
}
