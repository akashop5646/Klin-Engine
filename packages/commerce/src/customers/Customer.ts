export class Customer {
  public id: string;
  public email: string;
  public group?: string;

  constructor(id: string, email: string) {
    this.id = id;
    this.email = email;
  }
}
