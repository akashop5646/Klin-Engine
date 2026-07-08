import { PlatformProjection } from "../events/PlatformProjection";

export class WorkspaceProjection extends PlatformProjection {
  public readonly name: string = "Workspace";
  public workspacesCount: number = 0;

  public handleEvent(event: any): void {
    if (event.type === "workspace.created") {
      this.workspacesCount++;
    }
  }
}
