import { CommerceEngine } from "../core/CommerceEngine";
import { CatalogManager } from "../catalog/CatalogManager";
import { InventoryManager } from "../inventory/InventoryManager";
import { CartManager } from "../cart/CartManager";
import { CheckoutManager } from "../checkout/CheckoutManager";
import { OrderManager } from "../orders/OrderManager";
import { CustomerManager } from "../customers/CustomerManager";
import { PaymentManager } from "../payments/PaymentManager";

export class CommerceSDK {
  public engine: CommerceEngine;
  public catalog: CatalogManager;
  public inventory: InventoryManager;
  public cart: CartManager;
  public checkout: CheckoutManager;
  public orders: OrderManager;
  public customers: CustomerManager;
  public payments: PaymentManager;

  constructor(
    engine: CommerceEngine,
    catalog: CatalogManager,
    inventory: InventoryManager,
    cart: CartManager,
    checkout: CheckoutManager,
    orders: OrderManager,
    customers: CustomerManager,
    payments: PaymentManager
  ) {
    this.engine = engine;
    this.catalog = catalog;
    this.inventory = inventory;
    this.cart = cart;
    this.checkout = checkout;
    this.orders = orders;
    this.customers = customers;
    this.payments = payments;
  }
}
