import { DeploymentProvider } from "./DeploymentProvider";

export class StaticProvider implements DeploymentProvider {
  public readonly name: string = "Static";

  public async deploy(manifest: any): Promise<boolean> {
    console.log(`StaticProvider deploying website instance...`);
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
