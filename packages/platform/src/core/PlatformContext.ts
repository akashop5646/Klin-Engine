export class PlatformContext {
  public workspaceId: string;
  public projectId: string;
  public websiteInstanceId?: string;
  public activeEnvironment: string;
  public activeUserId?: string;

  constructor(workspaceId: string, projectId: string, activeEnvironment: string) {
    this.workspaceId = workspaceId;
    this.projectId = projectId;
    this.activeEnvironment = activeEnvironment;
  }
}
