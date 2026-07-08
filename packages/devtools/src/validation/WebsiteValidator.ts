import { Validator, ValidationError } from "./Validator";

export class WebsiteValidator extends Validator {
  public validate(target: any): ValidationError[] {
    const errors: ValidationError[] = [];
    if (!target.pages || target.pages.length === 0) {
      errors.push({ code: "KLIN0120", message: "Website must contain at least one layout page." });
    }
    return errors;
  }
}
