export class GiftCard {
  public id: string;
  public code: string;
  public balance: number;

  constructor(id: string, code: string, balance: number) {
    this.id = id;
    this.code = code;
    this.balance = balance;
  }
}
