export class AddressValidator {
  public validatePostalCode(zip: string): boolean {
    return zip.length >= 5;
  }
}
