export interface RedirectConfig {
  fromPath: string;
  toPath: string;
  statusCode: 301 | 302;
}

export interface RouteMatch {
  pageId: string;
  params: Record<string, string>;
}

export class RouteManager {
  private routes: Map<string, string> = new Map(); // routePattern -> pageId
  private redirects: Map<string, RedirectConfig> = new Map(); // fromPath -> RedirectConfig

  registerRoute(pattern: string, pageId: string): void {
    this.routes.set(pattern, pageId);
  }

  unregisterRoute(pattern: string): void {
    this.routes.delete(pattern);
  }

  registerRedirect(fromPath: string, toPath: string, statusCode: 301 | 302 = 301): void {
    this.redirects.set(fromPath, { fromPath, toPath, statusCode });
  }

  getRedirect(path: string): RedirectConfig | undefined {
    return this.redirects.get(path);
  }

  matchRoute(path: string): RouteMatch | null {
    // 1. Direct match
    const directPageId = this.routes.get(path);
    if (directPageId) {
      return { pageId: directPageId, params: {} };
    }

    // 2. Pattern matching (e.g. /blog/:slug)
    for (const [pattern, pageId] of this.routes.entries()) {
      const match = this.matchPattern(pattern, path);
      if (match) {
        return { pageId, params: match };
      }
    }

    return null;
  }

  detectConflicts(): string[] {
    const conflicts: string[] = [];
    const patterns = Array.from(this.routes.keys());

    for (let i = 0; i < patterns.length; i++) {
      for (let j = i + 1; j < patterns.length; j++) {
        if (this.arePatternsOverlapping(patterns[i], patterns[j])) {
          conflicts.push(`Overlapping routes found: "${patterns[i]}" and "${patterns[j]}"`);
        }
      }
    }

    return conflicts;
  }

  private matchPattern(pattern: string, path: string): Record<string, string> | null {
    const patternParts = pattern.split("/").filter(Boolean);
    const pathParts = path.split("/").filter(Boolean);

    if (patternParts.length !== pathParts.length) return null;

    const params: Record<string, string> = {};

    for (let i = 0; i < patternParts.length; i++) {
      const pPart = patternParts[i];
      const pathPart = pathParts[i];

      if (pPart.startsWith(":")) {
        const paramName = pPart.slice(1);
        params[paramName] = pathPart;
      } else if (pPart !== pathPart) {
        return null;
      }
    }

    return params;
  }

  private arePatternsOverlapping(p1: string, p2: string): boolean {
    if (p1 === p2) return true;

    const parts1 = p1.split("/").filter(Boolean);
    const parts2 = p2.split("/").filter(Boolean);

    if (parts1.length !== parts2.length) return false;

    // If they have dynamic parameters at same spots, they overlap
    for (let i = 0; i < parts1.length; i++) {
      const isDynamic1 = parts1[i].startsWith(":");
      const isDynamic2 = parts2[i].startsWith(":");
      
      if (!isDynamic1 && !isDynamic2 && parts1[i] !== parts2[i]) {
        return false;
      }
    }

    return true;
  }
}
