import { RenderSession } from "../session/RenderSession";

export class DiagnosticsManager {
  public static capture(session: RenderSession): Record<string, any> {
    const duration = Date.now() - session.startedAt;
    session.duration = duration;
    return {
      sessionId: session.id,
      requestId: session.requestId,
      traceId: session.traceId,
      runtime: session.runtime,
      renderMode: session.renderMode,
      durationMs: duration,
      errorsCount: session.errors.length,
      warningsCount: session.warnings.length,
      cacheHits: session.cacheHits,
      cacheMisses: session.cacheMisses,
      stages: session.pipelineStages,
      marks: Object.fromEntries(session.marks.entries()),
    };
  }
}
