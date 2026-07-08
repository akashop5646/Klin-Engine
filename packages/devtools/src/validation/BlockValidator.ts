import { Validator, ValidationError } from "./Validator";

export class BlockValidator extends Validator {
  public validate(target: any): ValidationError[] {
    const errors: ValidationError[] = [];
    if (!target.name) {
      errors.push({ code: "KLIN0130", message: "Block metadata name cannot be empty." });
    }
    return errors;
  }
}
