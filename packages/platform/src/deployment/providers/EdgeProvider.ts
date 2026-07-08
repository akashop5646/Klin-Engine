import { DeploymentProvider } from "./DeploymentProvider";

export class EdgeProvider implements DeploymentProvider {
  public readonly name: string = "Edge";

  public async deploy(manifest: any): Promise<boolean> {
    console.log(`EdgeProvider deploying workers to Edge locations...`);
    return true;
  }

  public async rollback(snapshotId: string): Promise<boolean> {
    return true;
  }

  public async verify(): Promise<boolean> {
    return true;
  }

  public async health(): Promise<boolean> {
    return true;
  }

  public async destroy(): Promise<boolean> {
    return true;
  }
}
