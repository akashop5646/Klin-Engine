export interface PageSchema {
  pageTitle: string;
  slug: string;
  url: string;
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords?: string[];
  };
  visibility: "public" | "private" | "password" | "role-based";
  templateRef: string;
  blockOverrides: Record<string, Record<string, unknown>>;
}
