import type { PageInstance } from "../core/PageFactory";
import type { ValidationReport, ValidationError } from "../runtime/PageValidator";
import { Result, Ok, Err } from "@klin/core";

export interface ValidatorStage {
  id: string;
  priority: number;
  validate(pageInstance: PageInstance, report: ValidationReport): Promise<void> | void;
}

export class ValidationPipeline {
  private stages: ValidatorStage[] = [];

  constructor() {
    // 1. Schema Validator
    this.addStage({
      id: "SchemaValidator",
      priority: 10,
      validate: (pageInstance, report) => {
        const def = pageInstance.definition;
        if (!def.templateId) {
          report.isValid = false;
          report.errors.push({
            code: "SCHEMA_MISSING_TEMPLATE",
            message: "TemplateId is missing from page definition.",
            field: "templateId",
            severity: "error",
          });
        }
      },
    });

    // 2. Route Validator
    this.addStage({
      id: "RouteValidator",
      priority: 20,
      validate: (pageInstance, report) => {
        const def = pageInstance.definition;
        if (!def.route.slug) {
          report.isValid = false;
          report.errors.push({
            code: "ROUTE_MISSING_SLUG",
            message: "Slug path route is missing.",
            field: "route.slug",
            severity: "error",
          });
        }
      },
    });

    // 3. SEO Validator
    this.addStage({
      id: "SEOValidator",
      priority: 30,
      validate: (pageInstance, report) => {
        const def = pageInstance.definition;
        if (!def.seo.title) {
          report.warnings.push({
            code: "SEO_MISSING_TITLE",
            message: "Title meta tag is missing.",
            field: "seo.title",
            severity: "warning",
          });
        }
      },
    });
  }

  addStage(stage: ValidatorStage): this {
    this.stages.push(stage);
    this.stages.sort((a, b) => a.priority - b.priority);
    return this;
  }

  async run(pageInstance: PageInstance): Promise<Result<ValidationReport, Error>> {
    const report: ValidationReport = {
      isValid: true,
      score: 100,
      errors: [],
      warnings: [],
      infos: [],
      suggestions: [],
    };

    for (const stage of this.stages) {
      try {
        await stage.validate(pageInstance, report);
      } catch (err) {
        return new Err(new Error(`Validation stage [${stage.id}] error: ${(err as Error).message}`));
      }
    }

    report.isValid = report.errors.length === 0;
    
    // Calculate simple health score
    let score = 100;
    score -= report.errors.length * 20;
    score -= report.warnings.length * 5;
    report.score = Math.max(0, Math.min(100, score));

    return new Ok(report);
  }
}
