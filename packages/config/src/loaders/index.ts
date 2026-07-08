import { AppConfig } from "../types";
import { DEFAULT_CONFIG } from "../defaults";

export function loadConfigFromEnv(): AppConfig {
  const gatewayPort = process.env.KLIN_GATEWAY_PORT ? parseInt(process.env.KLIN_GATEWAY_PORT, 10) : undefined;
  
  return {
    database: {
      url: process.env.KLIN_DATABASE_URL || DEFAULT_CONFIG.database.url,
    },
    storage: {
      bucket: process.env.KLIN_STORAGE_BUCKET || DEFAULT_CONFIG.storage.bucket,
    },
    auth: {
      secret: process.env.KLIN_AUTH_SECRET || DEFAULT_CONFIG.auth.secret,
    },
    gateway: {
      port: gatewayPort && !isNaN(gatewayPort) ? gatewayPort : DEFAULT_CONFIG.gateway.port,
      url: process.env.KLIN_GATEWAY_URL || DEFAULT_CONFIG.gateway.url,
    },
  };
}
