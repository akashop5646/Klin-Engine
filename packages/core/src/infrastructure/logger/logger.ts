import { LoggerTransport } from "./transport";
import { ConsoleTransport } from "./console";

export interface ILogger {
  info(message: string, ...meta: any[]): void;
  warn(message: string, ...meta: any[]): void;
  error(message: string, ...meta: any[]): void;
  debug(message: string, ...meta: any[]): void;
  addTransport(transport: LoggerTransport): void;
  removeTransport(transport: LoggerTransport): void;
}

export class Logger implements ILogger {
  private transports: LoggerTransport[] = [];

  constructor() {
    this.addTransport(new ConsoleTransport());
  }

  addTransport(transport: LoggerTransport): void {
    if (!this.transports.includes(transport)) {
      this.transports.push(transport);
    }
  }

  removeTransport(transport: LoggerTransport): void {
    this.transports = this.transports.filter((t) => t !== transport);
  }

  info(message: string, ...meta: any[]): void {
    this.dispatch("info", message, ...meta);
  }

  warn(message: string, ...meta: any[]): void {
    this.dispatch("warn", message, ...meta);
  }

  error(message: string, ...meta: any[]): void {
    this.dispatch("error", message, ...meta);
  }

  debug(message: string, ...meta: any[]): void {
    this.dispatch("debug", message, ...meta);
  }

  private dispatch(level: "info" | "warn" | "error" | "debug", message: string, ...meta: any[]): void {
    for (const transport of this.transports) {
      try {
        transport.log(level, message, ...meta);
      } catch (err) {
        console.error("Failed to write log using transport:", err);
      }
    }
  }
}

export const logger = new Logger();
