export interface StreamContext {
  chunkSize: number;
  onChunk?(chunk: string): void;
  onComplete?(): void;
  onError?(err: Error): void;
}
