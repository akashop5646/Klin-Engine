export class IconLibrary {
  private _icons: Map<string, string> = new Map(); // iconName -> svgContent

  constructor() {
    this.registerDefaults();
  }

  public register(name: string, svg: string): void {
    this._icons.set(name, svg);
  }

  public getIcon(name: string): string | undefined {
    return this._icons.get(name);
  }

  private registerDefaults(): void {
    this.register("search", "<svg>SearchIcon</svg>");
    this.register("settings", "<svg>SettingsIcon</svg>");
    this.register("arrow-right", "<svg>ArrowRightIcon</svg>");
  }
}
