import { PlatformProjection } from "../events/PlatformProjection";

export class DeploymentProjection extends PlatformProjection {
  public readonly name: string = "Deployment";
  public successCount: number = 0;

  public handleEvent(event: any): void {
    if (event.type === "deployment.completed") {
      this.successCount++;
    }
  }
}
