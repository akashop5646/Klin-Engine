import { Deployment } from "./Deployment";

export class DeploymentManager {
  private _deployments: Map<string, Deployment> = new Map();

  public createDeployment(websiteId: string): Deployment {
    const id = "dep-" + Math.random().toString(36).substring(2, 9);
    const deployment = new Deployment(id, websiteId);
    this._deployments.set(id, deployment);
    return deployment;
  }

  public getDeployment(id: string): Deployment | undefined {
    return this._deployments.get(id);
  }
}
