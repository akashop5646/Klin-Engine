export class CompanyAccount {
  public id: string;
  public companyName: string;
  public creditLimit: number;

  constructor(id: string, companyName: string, creditLimit: number) {
    this.id = id;
    this.companyName = companyName;
    this.creditLimit = creditLimit;
  }
}
