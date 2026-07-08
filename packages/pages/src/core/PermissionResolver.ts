import type { PageDefinition } from "./PageDefinition";

export interface UserAccessContext {
  userId?: string;
  roles?: string[];
  providedPassword?: string;
}

export class PermissionResolver {
  canAccess(definition: PageDefinition, context: UserAccessContext): boolean {
    const policy = definition.permissions.visibility;

    if (policy === "public") {
      return true;
    }

    if (policy === "private") {
      // Draft mode — only accessible if authorized user context is provided
      return !!context.userId;
    }

    if (policy === "role-based") {
      if (!context.roles || !definition.permissions.rolesAllowed) {
        return false;
      }
      return definition.permissions.rolesAllowed.some((role) =>
        context.roles!.includes(role)
      );
    }

    if (policy === "password") {
      if (!context.providedPassword || !definition.permissions.passwordHash) {
        return false;
      }
      // Simple string match evaluation for demonstration (hash match can be added in CMS)
      return context.providedPassword === definition.permissions.passwordHash;
    }

    return false;
  }
}
