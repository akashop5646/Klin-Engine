export class EnvironmentManager {
  private _environments: Map<string, string> = new Map();

  public promoteStage(websiteId: string, from: string, to: string): void {
    console.log(`Promoted Website Instance: ${websiteId} from [${from}] to [${to}]`);
    this._environments.set(websiteId, to);
  }

  public getStage(websiteId: string): string {
    return this._environments.get(websiteId) || "Development";
  }
}
