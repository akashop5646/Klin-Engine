import { ERROR_CODES } from "../constants/errors";

export class KlinError extends Error {
  public readonly code: string;
  public readonly timestamp: number;

  constructor(message: string, code: string = ERROR_CODES.UNKNOWN) {
    super(message);
    this.name = "KlinError";
    this.code = code;
    this.timestamp = Date.now();
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ConfigurationError extends KlinError {
  constructor(message: string) {
    super(message, ERROR_CODES.CONFIGURATION);
    this.name = "ConfigurationError";
  }
}

export class RegistryError extends KlinError {
  constructor(message: string) {
    super(message, ERROR_CODES.REGISTRY);
    this.name = "RegistryError";
  }
}

export class RendererError extends KlinError {
  constructor(message: string) {
    super(message, ERROR_CODES.RENDERER);
    this.name = "RendererError";
  }
}

export class BuilderError extends KlinError {
  constructor(message: string) {
    super(message, ERROR_CODES.BUILDER);
    this.name = "BuilderError";
  }
}

export class ValidationError extends KlinError {
  constructor(message: string) {
    super(message, ERROR_CODES.VALIDATION);
    this.name = "ValidationError";
  }
}
