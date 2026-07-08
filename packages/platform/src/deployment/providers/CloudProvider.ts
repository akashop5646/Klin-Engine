import { DeploymentProvider } from "./DeploymentProvider";

export class CloudProvider implements DeploymentProvider {
  public readonly name: string = "Cloud";

  public async deploy(manifest: any): Promise<boolean> {
    console.log(`CloudProvider coordinating multi-cloud deployment...`);
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
