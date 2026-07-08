export class PlatformMiddleware {
  public async executePublishMiddleware(context: any): Promise<void> {
    console.log(`Executing publish middleware hooks...`);
  }
}
