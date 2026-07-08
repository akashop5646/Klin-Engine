export class AnonymousMetrics {
  public compilePayload(): string {
    return JSON.stringify({
      os: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
      timestamp: new Date().toISOString()
    });
  }
}
