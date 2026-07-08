import type { PageManifest } from "../contracts/PageManifest";
import type { PageMetadata } from "../contracts/PageMetadata";
import type { AIPageMetadata } from "../contracts/AIPageMetadata";

export interface PageDefinition {
  manifest: PageManifest;
  templateId: string;
  route: {
    slug: string;
    url: string;
    aliases?: string[];
  };
  seo: {
    title: string;
    description: string;
    keywords?: string[];
    robots?: string;
    canonicalUrl?: string;
    openGraph?: Record<string, string>;
    twitterCard?: Record<string, string>;
    hreflang?: Array<{ lang: string; url: string }>;
  };
  overrides: Record<string, Record<string, unknown>>; // Block override diffs
  permissions: {
    visibility: "public" | "private" | "password" | "role-based";
    rolesAllowed?: string[];
    passwordHash?: string;
  };
  scheduling?: {
    publishAt?: number;
    unpublishAt?: number;
    expireAt?: number;
    archiveAt?: number;
  };
  metadata?: PageMetadata;
  aiMetadata?: AIPageMetadata;
}
