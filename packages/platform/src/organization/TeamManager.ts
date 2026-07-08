import { MemberRole } from "./MemberRole";

export class TeamManager {
  private _roles: Map<string, MemberRole> = new Map();

  public assignRole(userId: string, role: MemberRole): void {
    this._roles.set(userId, role);
  }

  public getRole(userId: string): MemberRole | undefined {
    return this._roles.get(userId);
  }
}
