export interface DatabaseConfig {
  url: string;
}

export interface StorageConfig {
  bucket: string;
}

export interface AuthConfig {
  secret: string;
}

export interface GatewayConfig {
  port: number;
  url: string;
}

export interface AppConfig {
  database: DatabaseConfig;
  storage: StorageConfig;
  auth: AuthConfig;
  gateway: GatewayConfig;
}
