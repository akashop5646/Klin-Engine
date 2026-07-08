import { ThemeCache } from "../cache";

export class ThemeInspector {
  private cache: ThemeCache;

  constructor(cache: ThemeCache) {
    this.cache = cache;
  }

  getSummary(themeId: string) {
    return {
      themeId,
      hasRawCache: !!this.cache.getRaw(themeId),
      hasResolvedCache: !!this.cache.getResolved(themeId),
      hasCompiledCache: !!this.cache.getCompiled(themeId),
    };
  }
}
