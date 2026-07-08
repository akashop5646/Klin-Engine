export interface FeatureFlags {
  enableAiBuilder: boolean;
  enableMarketplace: boolean;
  enableBetaThemes: boolean;
}

export const DEFAULT_FEATURES: FeatureFlags = {
  enableAiBuilder: false,
  enableMarketplace: false,
  enableBetaThemes: false,
};
