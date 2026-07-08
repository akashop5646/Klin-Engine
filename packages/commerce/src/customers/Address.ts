export class Address {
  public street: string;
  public city: string;
  public country: string;
  public postalCode: string;

  constructor(street: string, city: string, country: string, postalCode: string) {
    this.street = street;
    this.city = city;
    this.country = country;
    this.postalCode = postalCode;
  }
}
