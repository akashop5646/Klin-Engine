export class PreviewEngine {
  static getPreviewVariants(componentId: string): any[] {
    const metadataMap = (globalThis as any).__KLIN_COMPONENTS_METADATA__ || {};
    const entry = metadataMap[componentId];
    return entry?.previewConfig?.variants || [];
  }

  static getThumbnail(componentId: string): string | null {
    const metadataMap = (globalThis as any).__KLIN_COMPONENTS_METADATA__ || {};
    const entry = metadataMap[componentId];
    return entry?.builderConfig?.palette?.thumbnail || null;
  }
}
