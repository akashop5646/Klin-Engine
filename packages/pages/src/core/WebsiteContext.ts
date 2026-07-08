import type { NavigationGraph } from "../composition/NavigationGraph";

export interface WebsiteContext {
  websiteId: string;
  domain: string;
  defaultLocale: string;
  supportedLocales: string[];
  defaultThemeId: string;
  navigationGraph: NavigationGraph;
}
