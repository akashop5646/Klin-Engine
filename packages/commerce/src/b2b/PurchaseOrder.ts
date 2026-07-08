export class PurchaseOrder {
  public id: string;
  public companyAccountId: string;
  public amount: number;
  public status: "Draft" | "Submitted" | "Approved" = "Draft";

  constructor(id: string, companyAccountId: string, amount: number) {
    this.id = id;
    this.companyAccountId = companyAccountId;
    this.amount = amount;
  }
}
