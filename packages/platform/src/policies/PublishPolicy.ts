export class PublishPolicy {
  public validate(role: string): boolean {
    return role === "Owner" || role === "Administrator" || role === "Developer" || role === "Designer";
  }
}
