export type BuildProfile = "Development" | "Production" | "Test" | "CI" | "Benchmark";

export interface BuildProfileSettings {
  minify: boolean;
  sourceMaps: boolean;
  incremental: boolean;
  warningsAsErrors: boolean;
}

export const BUILD_PROFILE_SETTINGS: Record<BuildProfile, BuildProfileSettings> = {
  Development: { minify: false, sourceMaps: true, incremental: true, warningsAsErrors: false },
  Production: { minify: true, sourceMaps: false, incremental: false, warningsAsErrors: true },
  Test: { minify: false, sourceMaps: true, incremental: false, warningsAsErrors: false },
  CI: { minify: true, sourceMaps: true, incremental: false, warningsAsErrors: true },
  Benchmark: { minify: true, sourceMaps: false, incremental: false, warningsAsErrors: false }
};
