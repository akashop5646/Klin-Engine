export class RenderSession {
  public readonly id: string;
  public readonly startedAt: number;
  public readonly requestId: string;
  public readonly traceId: string;
  public readonly runtime: string;
  public readonly renderMode: string;
  
  public errors: Error[] = [];
  public warnings: string[] = [];
  public cacheHits: number = 0;
  public cacheMisses: number = 0;
  public duration: number = 0;
  
  public pipelineStages: string[] = [];
  public stageDurations: Map<string, number> = new Map(); // stageName -> durationMs
  public marks: Map<string, number> = new Map();

  constructor(requestId: string, traceId: string, runtime: string = "Server", renderMode: string = "SSR") {
    this.id = Math.random().toString(36).substring(2, 9);
    this.startedAt = Date.now();
    this.requestId = requestId;
    this.traceId = traceId;
    this.runtime = runtime;
    this.renderMode = renderMode;
  }

  public mark(label: string): void {
    this.marks.set(label, Date.now());
  }

  public getMeasure(label: string): number {
    const time = this.marks.get(label);
    return time ? Date.now() - time : 0;
  }

  public logStageDuration(stageName: string, durationMs: number): void {
    this.stageDurations.set(stageName, durationMs);
  }
}
