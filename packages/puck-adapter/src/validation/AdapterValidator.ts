import { Result, Ok, Err } from "@klin/core";
import { BuilderSchema } from "../mapper/types";

export class AdapterValidator {
  static validateSchema(schema: BuilderSchema): Result<void, Error> {
    if (!schema.componentId) {
      return new Err(new Error("Component schema missing componentId"));
    }
    if (!Array.isArray(schema.fields)) {
      return new Err(new Error("Component schema fields must be an array"));
    }
    return new Ok<void, Error>(undefined);
  }
}
