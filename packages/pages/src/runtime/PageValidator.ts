import type { PageInstance } from "../core/PageFactory";
import { Result, Ok, Err } from "@klin/core";
import { ValidationPipeline } from "../validation/ValidationPipeline";

export interface ValidationError {
  code: string;
  message: string;
  field?: string;
  severity: "error" | "warning" | "info";
}

export interface ValidationReport {
  isValid: boolean;
  score: number;
  errors: ValidationError[];
  warnings: ValidationError[];
  infos: ValidationError[];
  suggestions: string[];
}

export class PageValidator {
  private pipeline = new ValidationPipeline();

  async validate(pageInstance: PageInstance): Promise<Result<ValidationReport, Error>> {
    return this.pipeline.run(pageInstance);
  }
}
