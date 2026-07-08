export class ConstraintLayout {
  public getConstraintStyles(horizontal: string, vertical: string): Record<string, string> {
    const result: Record<string, string> = {};
    if (horizontal === "Fill") {
      result.width = "100%";
    } else if (horizontal === "Hug") {
      result.width = "fit-content";
    }
    if (vertical === "Fill") {
      result.height = "100%";
    } else if (vertical === "Hug") {
      result.height = "fit-content";
    }
    return result;
  }
}
