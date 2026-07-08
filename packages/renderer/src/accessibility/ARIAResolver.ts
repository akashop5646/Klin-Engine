import type { RenderNode } from "@klin/pages";

export class ARIAResolver {
  resolveARIA(node: RenderNode): RenderNode {
    const props = { ...node.props };
    
    if (node.blockId === "Button" || node.blockId === "LinkButton") {
      if (!props.role) {
        props.role = "button";
      }
      if (!props["aria-label"] && props.text) {
        props["aria-label"] = props.text;
      }
    }
    
    return {
      ...node,
      props,
    };
  }
}
