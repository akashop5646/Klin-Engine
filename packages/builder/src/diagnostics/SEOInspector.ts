export interface SEOIssue {
  type: "MissingTitle" | "MissingDescription" | "MissingOGImage";
  severity: "Warning" | "Error";
  message: string;
}

export class SEOInspector {
  public check(metadata: any): SEOIssue[] {
    const issues: SEOIssue[] = [];
    if (!metadata) return issues;

    if (!metadata.title) {
      issues.push({ type: "MissingTitle", severity: "Error", message: "Page title is missing" });
    }
    if (!metadata.description) {
      issues.push({ type: "MissingDescription", severity: "Warning", message: "Meta description is missing" });
    }

    return issues;
  }
}
