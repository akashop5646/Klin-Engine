import { Validator, ValidationError } from "./Validator";

export class PluginValidator extends Validator {
  public validate(target: any): ValidationError[] {
    const errors: ValidationError[] = [];
    if (!target.capabilities || target.capabilities.length === 0) {
      errors.push({ code: "KLIN0150", message: "Plugin must declare at least one capabilities flag." });
    }
    return errors;
  }
}
