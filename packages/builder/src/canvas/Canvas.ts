export interface CanvasConfig {
  puckEnabled: boolean;
}

export class Canvas {
  public puckEnabled: boolean;

  constructor(config: CanvasConfig) {
    this.puckEnabled = config.puckEnabled;
  }

  public registerDropListener(onDrop: (blockId: string, parentId: string, index: number) => void): void {
    // Canvas handles Puck visual drop event bindings
  }
}
