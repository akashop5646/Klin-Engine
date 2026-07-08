import { AppConfig } from "../types";
import { getEnvironmentConfig } from "../environment";

export const config: AppConfig = getEnvironmentConfig();
