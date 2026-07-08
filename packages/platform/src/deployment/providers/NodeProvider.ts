import { DeploymentProvider } from "./DeploymentProvider";

export class NodeProvider implements DeploymentProvider {
  public readonly name: string = "Node";

  public async deploy(manifest: any): Promise<boolean> {
    console.log(`NodeProvider deploying website to Node environment...`);
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
