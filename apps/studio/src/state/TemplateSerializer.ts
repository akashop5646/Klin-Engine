export interface PageNode {
  id: string;
  type: string;
  props: Record<string, any>;
  children: PageNode[];
}

export class TemplateSerializer {
  public serialize(nodes: PageNode[]): string {
    return JSON.stringify(nodes, null, 2);
  }

  public deserialize(json: string): PageNode[] {
    try {
      return JSON.parse(json) as PageNode[];
    } catch {
      throw new Error("Failed to deserialize layout JSON structure.");
    }
  }
}
