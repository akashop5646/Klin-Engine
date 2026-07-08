export interface PageManifest {
  id: string;
  slug: string;
  route: string;
  title: string;
  version: string;
  author?: string;
  templateId: string;
  category: string;
  tags?: string[];
  permissions?: {
    visibility: "public" | "private" | "password" | "role-based";
    rolesAllowed?: string[];
  };
  builderMetadata?: Record<string, unknown>;
}
