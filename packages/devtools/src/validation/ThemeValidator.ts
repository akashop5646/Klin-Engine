import { Validator, ValidationError } from "./Validator";

export class ThemeValidator extends Validator {
  public validate(target: any): ValidationError[] {
    const errors: ValidationError[] = [];
    if (!target.colors || !target.colors.primary) {
      errors.push({ code: "KLIN0140", message: "Theme colors configurations must define a primary color." });
    }
    return errors;
  }
}
