export class VariableManager {
  private _variables: Map<string, any> = new Map();

  constructor() {
    this.registerDefaults();
  }

  public set(key: string, val: any): void {
    this._variables.set(key, val);
  }

  public get(key: string): any {
    return this._variables.get(key);
  }

  public getVariables(): Record<string, any> {
    const result: Record<string, any> = {};
    this._variables.forEach((v, k) => {
      result[k] = v;
    });
    return result;
  }

  private registerDefaults(): void {
    this.set("company", "Klin Commerce Ltd");
    this.set("supportEmail", "support@klin.dev");
    this.set("copyright", "© 2026 Klin Commerce. All rights reserved.");
  }
}
