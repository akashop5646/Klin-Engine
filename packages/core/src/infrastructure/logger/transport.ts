export interface LoggerTransport {
  log(level: "info" | "warn" | "error" | "debug", message: string, ...meta: any[]): void;
}
