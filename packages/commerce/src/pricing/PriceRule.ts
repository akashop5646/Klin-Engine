export class PriceRule {
  public id: string;
  public ruleType: "Tier" | "Percentage" | "Fixed";
  public value: number;

  constructor(id: string, ruleType: "Tier" | "Percentage" | "Fixed", value: number) {
    this.id = id;
    this.ruleType = ruleType;
    this.value = value;
  }
}
