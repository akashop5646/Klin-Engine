import { BaseCatalog, CatalogItem } from "./BaseCatalog";

export * from "./BaseCatalog";

export interface ComponentItem extends CatalogItem {
  type: string;
  schema?: any;
}
export class ComponentCatalog extends BaseCatalog<ComponentItem> {}

export interface BlockItem extends CatalogItem {
  type: string;
}
export class BlockCatalog extends BaseCatalog<BlockItem> {}

export interface TemplateItem extends CatalogItem {
  layout: any;
}
export class TemplateCatalog extends BaseCatalog<TemplateItem> {}

export interface ThemeItem extends CatalogItem {
  tokens: Record<string, string>;
}
export class ThemeCatalog extends BaseCatalog<ThemeItem> {}

export interface CommandItem extends CatalogItem {
  handler: string;
}
export class CommandCatalog extends BaseCatalog<CommandItem> {}

export interface PluginItem extends CatalogItem {
  entry: string;
}
export class PluginCatalog extends BaseCatalog<PluginItem> {}

export interface ExtensionItem extends CatalogItem {
  permissions: string[];
}
export class ExtensionCatalog extends BaseCatalog<ExtensionItem> {}

export interface MarketplaceItem extends CatalogItem {
  author: string;
  price: number;
}
export class MarketplaceCatalog extends BaseCatalog<MarketplaceItem> {}
