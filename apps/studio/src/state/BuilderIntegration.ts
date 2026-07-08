import { PageNode } from "./TemplateSerializer";

export class BuilderIntegration {
  private _layoutTree: PageNode[] = [];

  public updateTree(actionType: "Move" | "Delete" | "Duplicate" | "Insert", nodeId: string, payload?: any): PageNode[] {
    console.log(`[BuilderIntegration] Mutating Layout Tree - Action: ${actionType} on Node: ${nodeId}`);
    
    // Simulate visual block tree structure mutations
    if (actionType === "Delete") {
      this._layoutTree = this._layoutTree.filter(n => n.id !== nodeId);
    } else if (actionType === "Duplicate") {
      const match = this._layoutTree.find(n => n.id === nodeId);
      if (match) {
        this._layoutTree.push({
          ...match,
          id: `${match.id}-copy-${Math.random().toString(36).substr(2, 4)}`
        });
      }
    } else if (actionType === "Insert" && payload) {
      this._layoutTree.push({
        id: nodeId,
        type: payload.type,
        props: payload.props || {},
        children: []
      });
    }

    // Trigger Renderer engine compile update
    this.triggerRendererCompile();

    return this._layoutTree;
  }

  public getLayoutTree(): PageNode[] {
    return this._layoutTree;
  }

  public setLayoutTree(tree: PageNode[]): void {
    this._layoutTree = tree;
  }

  private triggerRendererCompile(): void {
    console.log("[Renderer] Compiled Layout Tree. Rerendering Studio Canvas viewport...");
  }
}
export default BuilderIntegration;
