export class PlatformSession {
  public readonly id: string;
  public readonly workspaceId: string;
  public readonly projectId: string;
  public readonly userId: string;
  public readonly activeRole: string;
  public readonly traceId: string;
  public readonly requestId: string;
  public locale: string = "en";
  public timezone: string = "UTC";

  constructor(workspaceId: string, projectId: string, userId: string, activeRole: string, traceId: string, requestId: string) {
    this.id = Math.random().toString(36).substring(2, 9);
    this.workspaceId = workspaceId;
    this.projectId = projectId;
    this.userId = userId;
    this.activeRole = activeRole;
    this.traceId = traceId;
    this.requestId = requestId;
  }
}
