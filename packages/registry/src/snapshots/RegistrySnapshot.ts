import { CatalogItem } from "../catalogs/BaseCatalog";

export interface SerializedRegistryState {
  components: CatalogItem[];
  blocks: CatalogItem[];
  templates: CatalogItem[];
  themes: CatalogItem[];
  commands: CatalogItem[];
  plugins: CatalogItem[];
  extensions: CatalogItem[];
  marketplace: CatalogItem[];
}

export class RegistrySnapshot {
  takeSnapshot(catalogs: {
    components: any;
    blocks: any;
    templates: any;
    themes: any;
    commands: any;
    plugins: any;
    extensions: any;
    marketplace: any;
  }): SerializedRegistryState {
    return {
      components: JSON.parse(JSON.stringify(catalogs.components.list())),
      blocks: JSON.parse(JSON.stringify(catalogs.blocks.list())),
      templates: JSON.parse(JSON.stringify(catalogs.templates.list())),
      themes: JSON.parse(JSON.stringify(catalogs.themes.list())),
      commands: JSON.parse(JSON.stringify(catalogs.commands.list())),
      plugins: JSON.parse(JSON.stringify(catalogs.plugins.list())),
      extensions: JSON.parse(JSON.stringify(catalogs.extensions.list())),
      marketplace: JSON.parse(JSON.stringify(catalogs.marketplace.list())),
    };
  }

  restore(
    state: SerializedRegistryState,
    catalogs: {
      components: any;
      blocks: any;
      templates: any;
      themes: any;
      commands: any;
      plugins: any;
      extensions: any;
      marketplace: any;
    }
  ) {
    catalogs.components.clear();
    catalogs.blocks.clear();
    catalogs.templates.clear();
    catalogs.themes.clear();
    catalogs.commands.clear();
    catalogs.plugins.clear();
    catalogs.extensions.clear();
    catalogs.marketplace.clear();

    state.components.forEach((item) => catalogs.components.register(item));
    state.blocks.forEach((item) => catalogs.blocks.register(item));
    state.templates.forEach((item) => catalogs.templates.register(item));
    state.themes.forEach((item) => catalogs.themes.register(item));
    state.commands.forEach((item) => catalogs.commands.register(item));
    state.plugins.forEach((item) => catalogs.plugins.register(item));
    state.extensions.forEach((item) => catalogs.extensions.register(item));
    state.marketplace.forEach((item) => catalogs.marketplace.register(item));
  }
}
