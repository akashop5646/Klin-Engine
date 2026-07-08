export type LogLevel = "debug" | "info" | "warn" | "error";

export class Logger {
  private _level: LogLevel;

  constructor(level: LogLevel = "info") {
    this._level = level;
  }

  public debug(message: string, ...args: any[]): void {
    if (this._level === "debug") {
      console.log(`[DEBUG] ${message}`, ...args);
    }
  }

  public info(message: string, ...args: any[]): void {
    if (["debug", "info"].includes(this._level)) {
      console.log(`[INFO] ${message}`, ...args);
    }
  }

  public warn(message: string, ...args: any[]): void {
    if (["debug", "info", "warn"].includes(this._level)) {
      console.warn(`[WARN] ${message}`, ...args);
    }
  }

  public error(message: string, ...args: any[]): void {
    console.error(`[ERROR] ${message}`, ...args);
  }
}
