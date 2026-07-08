export interface RendererCapabilities {
  supportsSSR: boolean;
  supportsHydration: boolean;
  supportsStreaming: boolean;
  supportsEmailInlineStyles: boolean;
  supportsAnimations: boolean;
  supportsPDFExport: boolean;
}
