export class PlatformRuntime {
  public activeWorkspaceId?: string;
  public activeEnvironment: string = "Development";
  public userSession: any = null;
  public plugins: Map<string, any> = new Map();
  public globalCache: Map<string, any> = new Map();

  public get(key: string): any {
    return this.globalCache.get(key);
  }

  public set(key: string, value: any): void {
    this.globalCache.set(key, value);
  }
}
