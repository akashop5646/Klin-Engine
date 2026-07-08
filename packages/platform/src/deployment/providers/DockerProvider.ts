import { DeploymentProvider } from "./DeploymentProvider";

export class DockerProvider implements DeploymentProvider {
  public readonly name: string = "Docker";

  public async deploy(manifest: any): Promise<boolean> {
    console.log(`DockerProvider building and starting container...`);
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
