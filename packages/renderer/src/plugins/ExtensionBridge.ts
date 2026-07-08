export class ExtensionBridge {
  public postMessageToExtension(extId: string, eventName: string, data: any): void {
    console.log(`Bridge communication: Sent event ${eventName} to extension ${extId}`);
  }
}
