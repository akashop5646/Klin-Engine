import { RegistryContext } from "./RegistryContext";
import { RegistryLifecycle } from "./RegistryLifecycle";
import {
  ComponentCatalog,
  BlockCatalog,
  TemplateCatalog,
  ThemeCatalog,
  CommandCatalog,
  PluginCatalog,
  ExtensionCatalog,
  MarketplaceCatalog,
  CatalogItem,
} from "../catalogs";
import { RegistryHookManager } from "../hooks";
import { MemoryCache } from "../cache";
import { SearchEngine, SearchQuery } from "../search";
import { MetricsCollector } from "../metrics";
import { RegistryHealth } from "../health";
import { RegistrySnapshot, SerializedRegistryState } from "../snapshots";
import { RegistryExporter } from "../export";
import { ManifestLoader } from "../loader";
import { Result, Ok, Err } from "@klin/core";

export class RegistryEngine {
  readonly context: RegistryContext;
  readonly lifecycle = new RegistryLifecycle();

  readonly catalogs = {
    components: new ComponentCatalog(),
    blocks: new BlockCatalog(),
    templates: new TemplateCatalog(),
    themes: new ThemeCatalog(),
    commands: new CommandCatalog(),
    plugins: new PluginCatalog(),
    extensions: new ExtensionCatalog(),
    marketplace: new MarketplaceCatalog(),
  };

  readonly hooks = new RegistryHookManager();
  readonly cache = new MemoryCache();
  readonly searchEngine = new SearchEngine();
  readonly metrics = new MetricsCollector();
  readonly healthChecker = new RegistryHealth();
  readonly exporter = new RegistryExporter();
  readonly snapshot = new RegistrySnapshot();
  readonly manifestLoader = new ManifestLoader();

  constructor(context: RegistryContext) {
    this.context = context;
  }

  async registerManifest(raw: any): Promise<Result<void, Error>> {
    const loaded = this.manifestLoader.load(raw);
    if (!loaded.ok) {
      return new Err<void, Error>(loaded.error);
    }
    const manifest = loaded.value;

    await this.hooks.triggerBeforeRegister(manifest);

    manifest.assets.forEach((asset: any) => {
      const item: CatalogItem = {
        id: asset.id,
        version: manifest.version,
        name: asset.name,
        ...asset,
      };

      switch (manifest.type) {
        case "component":
          this.catalogs.components.register(item as any);
          break;
        case "block":
          this.catalogs.blocks.register(item as any);
          break;
        case "template":
          this.catalogs.templates.register(item as any);
          break;
        case "theme":
          this.catalogs.themes.register(item as any);
          break;
        case "plugin":
          this.catalogs.plugins.register(item as any);
          break;
        case "extension":
          this.catalogs.extensions.register(item as any);
          break;
        case "marketplace":
          this.catalogs.marketplace.register(item as any);
          break;
      }
    });

    this.metrics.recordRegistration();
    await this.hooks.triggerAfterRegister(manifest);

    if (this.context.eventBus) {
      await this.context.eventBus
        .getPublisher()
        .publish(`registry.${manifest.type}.registered`, manifest, "registry");
    }

    return new Ok<void, Error>(undefined);
  }

  async resolve<T extends CatalogItem>(type: string, id: string): Promise<T | undefined> {
    await this.hooks.triggerBeforeResolve(id);
    const cacheKey = `${type}:${id}`;
    const cached = this.cache.get<T>(cacheKey);
    if (cached) {
      this.metrics.recordLookup(true);
      await this.hooks.triggerAfterResolve(id, cached);
      return cached;
    }

    let found: T | undefined;
    switch (type) {
      case "component":
        found = this.catalogs.components.findById(id) as any;
        break;
      case "block":
        found = this.catalogs.blocks.findById(id) as any;
        break;
      case "template":
        found = this.catalogs.templates.findById(id) as any;
        break;
      case "theme":
        found = this.catalogs.themes.findById(id) as any;
        break;
      case "plugin":
        found = this.catalogs.plugins.findById(id) as any;
        break;
      case "extension":
        found = this.catalogs.extensions.findById(id) as any;
        break;
      case "marketplace":
        found = this.catalogs.marketplace.findById(id) as any;
        break;
    }

    if (found) {
      this.cache.set(cacheKey, found);
      this.metrics.recordLookup(false);
    } else {
      this.metrics.recordLookup(false);
    }

    await this.hooks.triggerAfterResolve(id, found);
    return found;
  }

  search(query: SearchQuery): any[] {
    const allItems: any[] = [
      ...this.catalogs.components.list(),
      ...this.catalogs.blocks.list(),
      ...this.catalogs.templates.list(),
      ...this.catalogs.themes.list(),
      ...this.catalogs.plugins.list(),
      ...this.catalogs.extensions.list(),
      ...this.catalogs.marketplace.list(),
    ];
    return this.searchEngine.search(allItems, query);
  }

  takeSnapshot(): SerializedRegistryState {
    return this.snapshot.takeSnapshot(this.catalogs);
  }

  restoreSnapshot(state: SerializedRegistryState) {
    this.snapshot.restore(state, this.catalogs);
    this.cache.clear();
  }

  exportState(): string {
    return this.exporter.exportState(this.catalogs);
  }

  importState(json: string) {
    this.exporter.importState(json, this.catalogs);
    this.cache.clear();
  }

  checkHealth() {
    return this.healthChecker.checkHealth(this.catalogs);
  }
}
