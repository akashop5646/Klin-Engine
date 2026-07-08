export class PlatformGateway {
  public async handleRequest(path: string, method: string, payload: any): Promise<any> {
    console.log(`PlatformGateway API call: [${method}] ${path}`);
    return {
      status: 200,
      data: { success: true },
    };
  }
}
