export class ClassManager {
  private _classes: Map<string, Record<string, any>> = new Map();

  public registerClass(className: string, styles: Record<string, any>): void {
    this._classes.set(className, styles);
  }

  public getStyles(className: string): Record<string, any> | undefined {
    return this._classes.get(className);
  }

  public getRegisteredClasses(): string[] {
    return Array.from(this._classes.keys());
  }
}
