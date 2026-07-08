export class CashDrawer {
  private _balance: number = 0;

  public openDrawer(): void {
    console.log("CashDrawer opened.");
  }

  public auditBalance(expected: number): boolean {
    return this._balance === expected;
  }
}
