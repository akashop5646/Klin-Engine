import { VNode } from "./VNode";

export interface PatchOperation {
  type: "UpdateProps" | "Replace" | "Insert" | "Remove";
  targetNode: VNode;
  payload?: any;
}

export class DiffEngine {
  public diff(oldNode: VNode, newNode: VNode): PatchOperation[] {
    const patches: PatchOperation[] = [];

    if (oldNode.type !== newNode.type) {
      patches.push({ type: "Replace", targetNode: oldNode, payload: newNode });
      return patches;
    }

    if (JSON.stringify(oldNode.props) !== JSON.stringify(newNode.props)) {
      patches.push({ type: "UpdateProps", targetNode: oldNode, payload: newNode.props });
    }

    return patches;
  }
}
