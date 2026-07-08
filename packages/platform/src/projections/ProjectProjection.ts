import { PlatformProjection } from "../events/PlatformProjection";

export class ProjectProjection extends PlatformProjection {
  public readonly name: string = "Project";
  public projectsCount: number = 0;

  public handleEvent(event: any): void {
    if (event.type === "project.created") {
      this.projectsCount++;
    }
  }
}
