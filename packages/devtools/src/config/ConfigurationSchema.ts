export interface ConfigurationSchema {
  projectName: string;
  version: string;
  buildProfile?: "Development" | "Production" | "Test" | "CI" | "Benchmark";
}
