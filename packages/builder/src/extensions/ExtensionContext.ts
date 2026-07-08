export class ExtensionContext {
  public getAPIVersion(): string {
    return "1.0.0";
  }

  public registerCustomControl(controlName: string, controlConfig: any): void {
    // Allows developers to insert visual sliders and options inside active builder canvas
  }
}
