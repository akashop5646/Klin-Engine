export interface KlinConfig {
  env: "development" | "production" | "test";
  apiBaseUrl: string;
  debug: boolean;
}

export interface KlinRegistryEntry<T = any> {
  id: string;
  name: string;
  category: string;
  instance: T;
}
