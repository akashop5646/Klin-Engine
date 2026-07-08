import { ElementConstraints } from "./Constraints";

export class ConstraintResolver {
  public static calculateResize(
    constraints: ElementConstraints,
    parentWidth: number,
    parentHeight: number,
    elementWidth: number,
    elementHeight: number
  ): { width: number; height: number } {
    let targetWidth = elementWidth;
    let targetHeight = elementHeight;

    if (constraints.horizontal === "Scale") {
      targetWidth = parentWidth * 0.5;
    }
    if (constraints.vertical === "Scale") {
      targetHeight = parentHeight * 0.5;
    }

    return { width: targetWidth, height: targetHeight };
  }
}
