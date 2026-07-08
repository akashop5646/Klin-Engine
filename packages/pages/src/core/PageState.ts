export interface PageState {
  isDirty: boolean;
  isPublished: boolean;
  isArchived: boolean;
  isLoading: boolean;
  selectedBlockId: string | null;
  selectedVariantId: string | null;
  previewMode: "desktop" | "laptop" | "tablet" | "mobile" | "print";
  lastSavedAt: number | null;
  lastPublishedAt: number | null;
}

export function createDefaultPageState(): PageState {
  return {
    isDirty: false,
    isPublished: false,
    isArchived: false,
    isLoading: false,
    selectedBlockId: null,
    selectedVariantId: null,
    previewMode: "desktop",
    lastSavedAt: null,
    lastPublishedAt: null,
  };
}
