import { BlockManifest } from "../contracts/BlockManifest";

export interface BlockPreviewData {
  thumbnail?: string;
  keywords: string[];
  category: string;
  recommendedPages?: string[];
  responsivePreviews?: Record<string, string>;
}

export class PreviewEngine {
  private previewCatalog: Map<string, BlockPreviewData> = new Map();

  registerPreview(blockId: string, data: BlockPreviewData) {
    this.previewCatalog.set(blockId, data);
  }

  getPreview(blockId: string): BlockPreviewData | undefined {
    return this.previewCatalog.get(blockId);
  }

  search(keyword: string): string[] {
    const matched: string[] = [];
    this.previewCatalog.forEach((data, blockId) => {
      if (
        data.category.toLowerCase().includes(keyword.toLowerCase()) ||
        data.keywords.some((k) => k.toLowerCase().includes(keyword.toLowerCase()))
      ) {
        matched.push(blockId);
      }
    });
    return matched;
  }
}
