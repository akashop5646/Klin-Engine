export interface BlockMetadata {
  description: string;
  keywords: string[];
  documentation?: string;
  examples?: Array<{
    title: string;
    description: string;
    properties: Record<string, any>;
  }>;
  marketplaceInfo?: {
    price: number;
    tags: string[];
  };
}
