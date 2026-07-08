export class CreditLimit {
  public canAuthorizePurchase(companyCredit: number, balanceOutstanding: number, amount: number): boolean {
    return (balanceOutstanding + amount) <= companyCredit;
  }
}
