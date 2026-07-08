import type { PageDefinition } from "../core/PageDefinition";

export interface SEOPayload {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  robots?: string;
  openGraph?: Record<string, string>;
  twitterCard?: Record<string, string>;
  hreflang?: Array<{ lang: string; url: string }>;
}

export class SEOManager {
  getSEO(definition: PageDefinition, domain: string = ""): SEOPayload {
    return {
      title: definition.seo.title || definition.manifest.title,
      description: definition.seo.description,
      keywords: definition.seo.keywords,
      canonicalUrl: definition.seo.canonicalUrl || `${domain}${definition.route.url}`,
      robots: definition.seo.robots ?? "index, follow",
      openGraph: definition.seo.openGraph,
      twitterCard: definition.seo.twitterCard,
      hreflang: definition.seo.hreflang,
    };
  }
}
