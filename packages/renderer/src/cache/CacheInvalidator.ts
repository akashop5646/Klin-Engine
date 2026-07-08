import { RenderCache } from "./RenderCache";
import { PageCache } from "./PageCache";
import { FragmentCache } from "./FragmentCache";

export class CacheInvalidator {
  private _renderCache: RenderCache;
  private _pageCache: PageCache;
  private _fragmentCache: FragmentCache;

  constructor(renderCache: RenderCache, pageCache: PageCache, fragmentCache: FragmentCache) {
    this._renderCache = renderCache;
    this._pageCache = pageCache;
    this._fragmentCache = fragmentCache;
  }

  public invalidateAll(): void {
    this._renderCache.clear();
  }

  public invalidateKey(key: string): void {
    this._renderCache.invalidate(key);
    this._pageCache.invalidate(key);
    this._fragmentCache.invalidate(key);
  }
}
