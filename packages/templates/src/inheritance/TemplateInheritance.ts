import { LayoutNode } from "../composition/LayoutTree";
import { Result, Ok, Err } from "@klin/core";

export class TemplateInheritance {
  extend(parent: LayoutNode[], overrides: LayoutNode[]): LayoutNode[] {
    const parentMap = new Map(parent.map((n) => [n.blockId, n]));
    const merged: LayoutNode[] = [];

    for (const item of overrides) {
      const parentNode = parentMap.get(item.blockId);
      if (parentNode) {
        merged.push({
          ...parentNode,
          ...item,
          properties: { ...parentNode.properties, ...item.properties },
        });
        parentMap.delete(item.blockId);
      } else {
        merged.push(item);
      }
    }

    // Include remaining parent nodes
    parentMap.forEach((node) => {
      merged.push(node);
    });

    return merged;
  }
}
