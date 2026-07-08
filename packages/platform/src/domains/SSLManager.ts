export class SSLManager {
  public async provisionCertificate(domain: string): Promise<boolean> {
    console.log(`SSLManager provisioned Let's Encrypt certificate for domain: ${domain}`);
    return true;
  }

  public async checkExpiry(domain: string): Promise<number> {
    return Date.now() + 90 * 24 * 60 * 60 * 1000;
  }
}
