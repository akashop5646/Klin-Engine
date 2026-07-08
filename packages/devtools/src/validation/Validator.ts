export interface ValidationError {
  code: string;
  message: string;
}

export abstract class Validator {
  public abstract validate(target: any): ValidationError[];
}
