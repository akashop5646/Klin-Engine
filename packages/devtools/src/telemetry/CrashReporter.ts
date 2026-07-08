export class CrashReporter {
  public reportCrash(error: Error): void {
    console.error(`[CrashReporter] Critical error detected: ${error.message}`);
    console.error(error.stack);
  }
}
