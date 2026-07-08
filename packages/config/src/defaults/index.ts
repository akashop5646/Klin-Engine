import { AppConfig } from "../types";

export const DEFAULT_CONFIG: AppConfig = {
  database: {
    url: "mongodb://localhost:27017/klin",
  },
  storage: {
    bucket: "klin-storefront-assets",
  },
  auth: {
    secret: "klin-development-secret-key-change-in-prod",
  },
  gateway: {
    port: 8000,
    url: "http://localhost:8000",
  },
};
