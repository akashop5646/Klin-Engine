export interface TemplateVersionDescriptor {
  schemaVersion: string;
  templateVersion: string;
  builderVersion: string;
}

export interface VersionedTemplate {
  version: TemplateVersionDescriptor;
  templateId: string;
  data: Record<string, unknown>;
}

export function createVersion(
  schema: string,
  template: string,
  builder: string
): TemplateVersionDescriptor {
  return {
    schemaVersion: schema,
    templateVersion: template,
    builderVersion: builder,
  };
}

export function isVersionCompatible(
  required: TemplateVersionDescriptor,
  current: TemplateVersionDescriptor
): boolean {
  return compareSemver(current.schemaVersion, required.schemaVersion) >= 0;
}

/**
 * Basic semver comparison: returns -1, 0, or 1.
 * Compares major.minor.patch numerically.
 */
export function compareSemver(a: string, b: string): number {
  const partsA = a.split(".").map(Number);
  const partsB = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    const va = partsA[i] ?? 0;
    const vb = partsB[i] ?? 0;
    if (va > vb) return 1;
    if (va < vb) return -1;
  }
  return 0;
}
