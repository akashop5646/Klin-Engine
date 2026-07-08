import type { PageInstance } from "../core/PageFactory";
import type { ValidationReport } from "../runtime/PageValidator";

export interface DiagnosticsReport {
  pageId: string;
  templateId: string;
  route: string;
  blockOverridesCount: number;
  seoScore: number;
  validationIssuesCount: number;
  hasPublishedVersion: boolean;
}

export class Inspector {
  generateDiagnostics(
    pageInstance: PageInstance,
    validationReport?: ValidationReport
  ): DiagnosticsReport {
    const def = pageInstance.definition;
    const state = pageInstance.getState();

    const blockOverridesCount = Object.keys(def.overrides).length;
    const seoScore = validationReport?.score ?? 100;
    
    let validationIssuesCount = 0;
    if (validationReport) {
      validationIssuesCount = validationReport.errors.length + validationReport.warnings.length;
    }

    return {
      pageId: def.manifest.id,
      templateId: def.templateId,
      route: def.route.url,
      blockOverridesCount,
      seoScore,
      validationIssuesCount,
      hasPublishedVersion: state.isPublished,
    };
  }
}
