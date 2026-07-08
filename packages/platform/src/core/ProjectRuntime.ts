export class ProjectRuntime {
  public projectId: string;
  public activeWebsiteInstanceId?: string;
  public activePreviewSessionId?: string;
  public environmentStage: "Development" | "Preview" | "Staging" | "Production" = "Development";
  public permissions: Set<string> = new Set();

  constructor(projectId: string) {
    this.projectId = projectId;
  }
}
