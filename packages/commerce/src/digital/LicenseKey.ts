export class LicenseKey {
  public key: string;
  public active: boolean = false;

  constructor(key: string) {
    this.key = key;
  }
}
