export type UserRole = "Admin" | "Editor" | "Author" | "Viewer";

export interface PermissionPolicy {
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
  publish: boolean;
}

export class RolePolicy {
  private static readonly POLICIES: Record<UserRole, PermissionPolicy> = {
    Admin: { create: true, read: true, update: true, delete: true, publish: true },
    Editor: { create: true, read: true, update: true, delete: false, publish: true },
    Author: { create: true, read: true, update: true, delete: false, publish: false },
    Viewer: { create: false, read: true, update: false, delete: false, publish: false },
  };

  public static getPolicy(role: UserRole): PermissionPolicy {
    return this.POLICIES[role];
  }
}
