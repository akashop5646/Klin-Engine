export interface Invoice {
  readonly id: string;
  readonly workspaceId: string;
  readonly amount: number;
  readonly date: number;
  readonly status: "Paid" | "Unpaid";
}

export class InvoiceManager {
  private _invoices: Invoice[] = [];

  public generateInvoice(workspaceId: string, amount: number): Invoice {
    const id = "inv-" + Math.random().toString(36).substring(2, 9);
    const invoice: Invoice = {
      id,
      workspaceId,
      amount,
      date: Date.now(),
      status: "Unpaid",
    };
    this._invoices.push(invoice);
    return invoice;
  }

  public payInvoice(invoiceId: string): void {
    const inv = this._invoices.find((i) => i.id === invoiceId);
    if (inv) {
      (inv as any).status = "Paid";
    }
  }

  public getInvoices(workspaceId: string): Invoice[] {
    return this._invoices.filter((i) => i.workspaceId === workspaceId);
  }
}
