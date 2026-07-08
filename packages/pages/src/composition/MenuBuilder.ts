import { NavigationGraph, NavigationNode } from "./NavigationGraph";

export interface MenuItem {
  label: string;
  route: string;
  items?: MenuItem[];
}

export class MenuBuilder {
  buildMenu(graph: NavigationGraph): MenuItem[] {
    const rootNodes = graph.getRootNodes();
    return this.mapNodes(rootNodes);
  }

  private mapNodes(nodes: NavigationNode[]): MenuItem[] {
    return nodes.map((node) => {
      const item: MenuItem = {
        label: node.label,
        route: node.route,
      };
      if (node.children && node.children.length > 0) {
        item.items = this.mapNodes(node.children);
      }
      return item;
    });
  }
}
