export class Logger {
  public info(message: string): void {
    console.log(`[INFO] ${message}`);
  }

  public warn(message: string): void {
    console.warn(`[WARN] ${message}`);
  }

  public error(message: string): void {
    console.error(`[ERROR] ${message}`);
  }
}
