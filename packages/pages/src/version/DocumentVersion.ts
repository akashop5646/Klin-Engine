export interface DocumentVersion {
  schemaVersion: string;
  pageVersion: string;
  builderVersion: string;
  templateVersion: string;
  blockVersion: string;
  themeVersion: string;
}

export interface VersionedDocument {
  version: DocumentVersion;
  pageId: string;
  data: Record<string, unknown>;
}

export function createDocumentVersion(
  schema: string,
  page: string,
  builder: string,
  template: string,
  block: string,
  theme: string
): DocumentVersion {
  return {
    schemaVersion: schema,
    pageVersion: page,
    builderVersion: builder,
    templateVersion: template,
    blockVersion: block,
    themeVersion: theme,
  };
}

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
