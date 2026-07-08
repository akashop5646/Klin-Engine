export class WebhookGateway {
  public async receiveEvent(providerName: string, eventPayload: any): Promise<boolean> {
    console.log(`WebhookGateway received event callback from ${providerName}`);
    return true;
  }
}
