import { Validator, ValidationError } from "./Validator";

export class DependencyValidator extends Validator {
  public validate(target: any): ValidationError[] {
    const errors: ValidationError[] = [];
    if (target.dependencies && target.dependencies["react"] && !target.dependencies["@klin/core"]) {
      errors.push({ code: "KLIN0160", message: "React project must resolve a dependency referencing @klin/core." });
    }
    return errors;
  }
}
