import type { WebsiteContext } from "./WebsiteContext";
import type { PageDefinition } from "./PageDefinition";
import { Result, Ok, Err } from "@klin/core";

export class WebsiteManager {
  private websites: Map<string, WebsiteContext> = new Map();
  private websitePages: Map<string, Set<string>> = new Map(); // websiteId -> Set of pageIds

  createWebsite(website: WebsiteContext): Result<void, Error> {
    if (this.websites.has(website.websiteId)) {
      return new Err(new Error(`Website already exists: ${website.websiteId}`));
    }
    this.websites.set(website.websiteId, website);
    this.websitePages.set(website.websiteId, new Set());
    return new Ok(undefined);
  }

  deleteWebsite(websiteId: string): Result<void, Error> {
    if (!this.websites.has(websiteId)) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    this.websites.delete(websiteId);
    this.websitePages.delete(websiteId);
    return new Ok(undefined);
  }

  renameWebsite(websiteId: string, newDomain: string): Result<void, Error> {
    const website = this.websites.get(websiteId);
    if (!website) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    website.domain = newDomain;
    return new Ok(undefined);
  }

  changeDomain(websiteId: string, newDomain: string): Result<void, Error> {
    return this.renameWebsite(websiteId, newDomain);
  }

  setTheme(websiteId: string, themeId: string): Result<void, Error> {
    const website = this.websites.get(websiteId);
    if (!website) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    website.defaultThemeId = themeId;
    return new Ok(undefined);
  }

  setDefaultLocale(websiteId: string, locale: string): Result<void, Error> {
    const website = this.websites.get(websiteId);
    if (!website) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    website.defaultLocale = locale;
    return new Ok(undefined);
  }

  addPage(websiteId: string, pageId: string): Result<void, Error> {
    const pages = this.websitePages.get(websiteId);
    if (!pages) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    pages.add(pageId);
    return new Ok(undefined);
  }

  removePage(websiteId: string, pageId: string): Result<void, Error> {
    const pages = this.websitePages.get(websiteId);
    if (!pages) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    pages.delete(pageId);
    return new Ok(undefined);
  }

  publishWebsite(websiteId: string): Result<Record<string, unknown>, Error> {
    const website = this.websites.get(websiteId);
    if (!website) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    const pageIds = Array.from(this.websitePages.get(websiteId) ?? []);
    return new Ok({
      websiteId,
      domain: website.domain,
      publishedAt: Date.now(),
      pageCount: pageIds.length,
      pages: pageIds,
    });
  }

  archiveWebsite(websiteId: string): Result<void, Error> {
    if (!this.websites.has(websiteId)) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    // Simply clear active pages mapping or mark state
    this.websitePages.set(websiteId, new Set());
    return new Ok(undefined);
  }

  exportWebsite(websiteId: string): Result<string, Error> {
    const website = this.websites.get(websiteId);
    if (!website) {
      return new Err(new Error(`Website not found: ${websiteId}`));
    }
    const data = {
      website,
      pageIds: Array.from(this.websitePages.get(websiteId) ?? []),
    };
    return new Ok(JSON.stringify(data, null, 2));
  }
}
