export class DropRules {
  static isDropAllowed(parentType: string | null, childType: string): boolean {
    const metadataMap = (globalThis as any).__KLIN_COMPONENTS_METADATA__ || {};
    const childEntry = metadataMap[childType];
    
    // Check if child specifies allowed parents
    const allowedParents: string[] = childEntry?.builderConfig?.allowedParents || [];
    if (allowedParents.length > 0 && parentType) {
      if (!allowedParents.includes(parentType)) {
        return false;
      }
    }

    if (parentType) {
      const parentEntry = metadataMap[parentType];
      // Check if parent supports nesting
      const supportsNesting = parentEntry?.builderConfig?.supportsNesting ?? true;
      if (!supportsNesting) {
        return false;
      }

      // Check if parent specifies allowed children
      const allowedChildren: string[] = parentEntry?.builderConfig?.allowedChildren || [];
      if (allowedChildren.length > 0) {
        if (!allowedChildren.includes(childType)) {
          return false;
        }
      }
    }

    return true;
  }
}
