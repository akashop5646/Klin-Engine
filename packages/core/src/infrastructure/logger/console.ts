import { LoggerTransport } from "./transport";

export class ConsoleTransport implements LoggerTransport {
  log(level: "info" | "warn" | "error" | "debug", message: string, ...meta: any[]): void {
    const timestamp = new Date().toISOString();
    const formattedMeta = meta.length > 0 ? ` | ${JSON.stringify(meta)}` : "";
    const logLine = `[${timestamp}] [${level.toUpperCase()}] ${message}${formattedMeta}`;

    switch (level) {
      case "error":
        console.error(logLine);
        break;
      case "warn":
        console.warn(logLine);
        break;
      default:
        console.log(logLine);
        break;
    }
  }
}
