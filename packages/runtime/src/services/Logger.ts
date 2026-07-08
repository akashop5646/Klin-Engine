export class Logger {
  public log(msg: string): void {
    console.log(`[Klin LOG] ${msg}`);
  }
  public info(msg: string): void {
    console.info(`[Klin INFO] ${msg}`);
  }
  public warn(msg: string): void {
    console.warn(`[Klin WARN] ${msg}`);
  }
  public error(msg: string): void {
    console.error(`[Klin ERROR] ${msg}`);
  }
}
