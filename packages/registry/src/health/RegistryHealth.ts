import { DependencyGraph } from "../graph/DependencyGraph";

export class RegistryHealth {
  checkHealth(catalogs: {
    components: any;
    blocks: any;
    templates: any;
    themes: any;
    commands: any;
    plugins: any;
    extensions: any;
    marketplace: any;
  }): { status: "healthy" | "unhealthy"; issues: string[] } {
    const issues: string[] = [];

    const ids = new Set<string>();
    const checkDuplicates = (list: any[], name: string) => {
      for (const item of list) {
        if (ids.has(item.id)) {
          issues.push(`Duplicate asset ID found: ${item.id} in ${name}`);
        }
        ids.add(item.id);
      }
    };

    checkDuplicates(catalogs.components.list(), "components");
    checkDuplicates(catalogs.blocks.list(), "blocks");
    checkDuplicates(catalogs.templates.list(), "templates");
    checkDuplicates(catalogs.themes.list(), "themes");
    checkDuplicates(catalogs.commands.list(), "commands");
    checkDuplicates(catalogs.plugins.list(), "plugins");
    checkDuplicates(catalogs.extensions.list(), "extensions");
    checkDuplicates(catalogs.marketplace.list(), "marketplace");

    const graph = new DependencyGraph();
    catalogs.plugins.list().forEach((item: any) => {
      if (item.dependencies) {
        Object.keys(item.dependencies).forEach((dep) => {
          graph.addEdge(item.id, dep);
        });
      }
    });

    if (graph.hasCircularReference()) {
      issues.push("Circular dependencies detected in plugin registry");
    }

    return {
      status: issues.length === 0 ? "healthy" : "unhealthy",
      issues,
    };
  }
}
