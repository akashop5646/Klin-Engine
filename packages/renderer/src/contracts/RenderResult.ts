export interface RenderResult {
  success: boolean;
  duration: number; // millisecond cost
  warnings: string[];
  errors: Error[];
  output: unknown; // e.g. ReactElement, HTML string, buffer array
  metadata: {
    nodeCount: number;
    componentCount: number;
    optimized: boolean;
    cached: boolean;
    hash?: string;
    [key: string]: unknown;
  };
}
