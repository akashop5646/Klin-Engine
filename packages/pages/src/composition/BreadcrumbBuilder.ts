import { NavigationGraph } from "./NavigationGraph";

export interface BreadcrumbItem {
  label: string;
  route: string;
}

export class BreadcrumbBuilder {
  buildBreadcrumbs(graph: NavigationGraph, pageId: string): BreadcrumbItem[] {
    return graph.getBreadcrumbs(pageId);
  }
}
