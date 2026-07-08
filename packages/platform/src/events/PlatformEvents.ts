export class PlatformEvents {
  public static readonly ProjectCreated = "project.created";
  public static readonly WebsiteCreated = "website.created";
  public static readonly PublishStarted = "publish.started";
  public static readonly PublishCompleted = "publish.completed";
  public static readonly DeploymentStarted = "deployment.started";
  public static readonly DeploymentCompleted = "deployment.completed";
  public static readonly DomainConnected = "domain.connected";
  public static readonly MemberInvited = "member.invited";

  private static _isFrozen: boolean = false;

  public static freeze(): void {
    this._isFrozen = true;
  }
}
