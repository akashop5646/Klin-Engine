import { loadConfigFromEnv } from "../loaders";
import { validateConfig } from "../validation";
import { AppConfig } from "../types";

let cachedConfig: AppConfig | null = null;

export function getEnvironmentConfig(): AppConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const raw = loadConfigFromEnv();
  const parsed = validateConfig(raw);

  if (!parsed.success) {
    throw new Error(`Configuration validation failed: ${parsed.error.message}`);
  }

  cachedConfig = parsed.data as AppConfig;
  return cachedConfig;
}
