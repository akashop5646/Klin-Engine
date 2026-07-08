export interface DiagnosticsReport {
  workspacePath: string;
  packageManager: string;
  dependenciesCount: number;
  warningCount: number;
  performanceScore: number;
}
