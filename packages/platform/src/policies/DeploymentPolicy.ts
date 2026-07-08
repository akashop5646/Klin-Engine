export class DeploymentPolicy {
  public validate(role: string): boolean {
    return role === "Owner" || role === "Administrator";
  }
}
