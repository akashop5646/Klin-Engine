export class Tracer {
  public generateTraceId(): string {
    return "trace-" + Math.random().toString(36).substring(2, 9);
  }

  public generateSpanId(): string {
    return "span-" + Math.random().toString(36).substring(2, 9);
  }
}
