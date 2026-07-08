import { CommerceEvent } from "./CommerceEvents";

export class CommerceAggregate {
  public id: string;
  public version: number = 0;

  constructor(id: string) {
    this.id = id;
  }

  public apply(event: CommerceEvent): void {
    this.version++;
    console.log(`CommerceAggregate ${this.id} applied event: ${event.name} (v${this.version})`);
  }
}
