import { UserRole, RolePolicy } from "./RolePolicy";

export class PermissionResolver {
  public static can(role: UserRole, action: "create" | "read" | "update" | "delete" | "publish"): boolean {
    const policy = RolePolicy.getPolicy(role);
    return policy ? policy[action] : false;
  }
}
