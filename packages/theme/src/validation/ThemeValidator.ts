import { Result, Ok, Err } from "@klin/core";

export class ThemeValidator {
  validate(theme: any): Result<void, Error> {
    if (!theme) return new Err<void, Error>(new Error("Theme config cannot be empty"));
    if (!theme.metadata || !theme.metadata.id) {
      return new Err<void, Error>(new Error("Theme metadata id is required"));
    }
    if (!theme.foundation) {
      return new Err<void, Error>(new Error("Theme foundation section is required"));
    }
    if (!theme.semantic) {
      return new Err<void, Error>(new Error("Theme semantic section is required"));
    }

    for (const cat of Object.keys(theme.semantic)) {
      for (const token of Object.keys(theme.semantic[cat])) {
        const val = theme.semantic[cat][token];
        if (val === token) {
          return new Err<void, Error>(
            new Error(`Circular reference detected: token '${token}' refers to itself`)
          );
        }
      }
    }

    return new Ok<void, Error>(undefined);
  }
}
