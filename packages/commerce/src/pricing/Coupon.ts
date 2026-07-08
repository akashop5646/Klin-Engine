export class Coupon {
  public code: string;
  public discountPercentage: number;
  public expiresAt: number;

  constructor(code: string, discountPercentage: number, expiresAt: number) {
    this.code = code;
    this.discountPercentage = discountPercentage;
    this.expiresAt = expiresAt;
  }

  public isValid(): boolean {
    return Date.now() < this.expiresAt;
  }
}
