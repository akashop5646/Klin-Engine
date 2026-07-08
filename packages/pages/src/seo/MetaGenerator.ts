import type { SEOPayload } from "./SEOManager";

export interface MetaTag {
  tagName: "meta" | "link" | "title" | "script";
  attributes: Record<string, string>;
  innerHTML?: string;
}

export class MetaGenerator {
  generateTags(seo: SEOPayload): MetaTag[] {
    const tags: MetaTag[] = [];

    // 1. Title
    tags.push({
      tagName: "title",
      attributes: {},
      innerHTML: seo.title,
    });

    // 2. Meta description
    tags.push({
      tagName: "meta",
      attributes: { name: "description", content: seo.description },
    });

    // 3. Keywords
    if (seo.keywords && seo.keywords.length > 0) {
      tags.push({
        tagName: "meta",
        attributes: { name: "keywords", content: seo.keywords.join(", ") },
      });
    }

    // 4. Robots
    if (seo.robots) {
      tags.push({
        tagName: "meta",
        attributes: { name: "robots", content: seo.robots },
      });
    }

    // 5. Canonical link
    if (seo.canonicalUrl) {
      tags.push({
        tagName: "link",
        attributes: { rel: "canonical", href: seo.canonicalUrl },
      });
    }

    // 6. OpenGraph tags
    if (seo.openGraph) {
      for (const [key, value] of Object.entries(seo.openGraph)) {
        tags.push({
          tagName: "meta",
          attributes: { property: `og:${key}`, content: value },
        });
      }
    }

    // 7. Twitter Card tags
    if (seo.twitterCard) {
      for (const [key, value] of Object.entries(seo.twitterCard)) {
        tags.push({
          tagName: "meta",
          attributes: { name: `twitter:${key}`, content: value },
        });
      }
    }

    // 8. Alternate Language Link (hreflang)
    if (seo.hreflang) {
      for (const entry of seo.hreflang) {
        tags.push({
          tagName: "link",
          attributes: { rel: "alternate", hreflang: entry.lang, href: entry.url },
        });
      }
    }

    // 9. Structured search JSON-LD
    const jsonLd = this.generateJsonLd(seo);
    tags.push({
      tagName: "script",
      attributes: { type: "application/ld+json" },
      innerHTML: JSON.stringify(jsonLd),
    });

    return tags;
  }

  private generateJsonLd(seo: SEOPayload): Record<string, unknown> {
    return {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "name": seo.title,
      "description": seo.description,
      ...(seo.canonicalUrl ? { "url": seo.canonicalUrl } : {}),
    };
  }
}
