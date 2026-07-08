import { CartItem } from "./CartItem";

export class Cart {
  public id: string;
  public items: CartItem[] = [];

  constructor(id: string) {
    this.id = id;
  }
}
