export interface MarketplaceMetadata {
  price: number;
  license: "Commercial" | "Personal" | "MIT";
  author: string;
  downloads: number;
  rating: number;
  screenshots: string[];
  demo?: string;
  changelog?: Array<{
    version: string;
    changes: string[];
  }>;
}
