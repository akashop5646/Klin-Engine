export class CommerceGateway {
  public async handleRequest(endpoint: string, payload: any): Promise<any> {
    console.log(`CommerceGateway routing request to endpoint: ${endpoint}`);
    return { success: true, payload };
  }
}
