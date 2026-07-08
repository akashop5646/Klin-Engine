export type HorizontalConstraint = "Left" | "Right" | "LeftAndRight" | "Center" | "Scale";
export type VerticalConstraint = "Top" | "Bottom" | "TopAndBottom" | "Center" | "Scale";

export interface ElementConstraints {
  horizontal: HorizontalConstraint;
  vertical: VerticalConstraint;
}

export class Constraints {
  public static create(horizontal: HorizontalConstraint, vertical: VerticalConstraint): ElementConstraints {
    return { horizontal, vertical };
  }
}
