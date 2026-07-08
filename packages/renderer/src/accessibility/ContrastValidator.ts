import type { RenderNode } from "@klin/pages";

export class ContrastValidator {
  validateContrast(node: RenderNode): boolean {
    const props = node.props;
    const color = props.color ?? props.textColor;
    const background = props.backgroundColor ?? props.background;
    
    if (color && background && color === background) {
      console.warn(`Accessibility Warning: Contrast issue found on node [${node.id}]: matching foreground and background colors.`);
      return false;
    }
    return true;
  }
}
