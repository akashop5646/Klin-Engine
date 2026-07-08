export interface ThemeMetadata {
  id: string;
  name: string;
  version: string;
  author: string;
  description: string;
  supportsDarkMode: boolean;
  preview: Record<string, string>;
}
