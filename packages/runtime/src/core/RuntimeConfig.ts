export interface RuntimeConfigOptions {
  env?: "development" | "production" | "test";
  version?: string;
  storageUri?: string;
  [key: string]: any;
}

export class RuntimeConfig {
  private options: RuntimeConfigOptions;

  constructor(options: RuntimeConfigOptions = {}) {
    this.options = {
      env: "development",
      version: "1.0.0",
      ...options,
    };
  }

  public get(key: string, defaultValue?: any): any {
    return this.options[key] !== undefined ? this.options[key] : defaultValue;
  }

  public set(key: string, value: any): void {
    this.options[key] = value;
  }

  public get env(): string {
    return this.options.env || "development";
  }

  public get version(): string {
    return this.options.version || "1.0.0";
  }
}
