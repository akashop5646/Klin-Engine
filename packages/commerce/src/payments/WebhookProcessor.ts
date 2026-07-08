export class WebhookProcessor {
  public verifySignature(payload: string, signature: string): boolean {
    return signature.length > 0;
  }
}
