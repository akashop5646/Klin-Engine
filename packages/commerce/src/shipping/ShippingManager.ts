import { ShippingMethod } from "./ShippingMethod";

export class ShippingManager {
  private _methods: ShippingMethod[] = [];

  public registerMethod(method: ShippingMethod): void {
    this._methods.push(method);
  }

  public getAvailableMethods(country: string): ShippingMethod[] {
    return this._methods;
  }
}
