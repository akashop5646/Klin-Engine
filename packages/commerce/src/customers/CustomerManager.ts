import { Customer } from "./Customer";

export class CustomerManager {
  private _customers: Map<string, Customer> = new Map();

  public registerCustomer(customer: Customer): void {
    this._customers.set(customer.id, customer);
  }

  public getCustomer(id: string): Customer | undefined {
    return this._customers.get(id);
  }
}
