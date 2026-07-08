export class Heartbeat {
  public async pingHeartbeat(serviceId: string): Promise<boolean> {
    console.log(`Pinging Heartbeat for service: ${serviceId}`);
    return true;
  }
}
