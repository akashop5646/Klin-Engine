export interface CommerceEvent {
  id: string;
  name: string;
  websiteId: string;
  data: any;
  timestamp: number;
}

export const CommerceEvents = {
  ORDER_CREATED: "order.created",
  INVENTORY_UPDATED: "inventory.updated",
  CART_CHECKED_OUT: "cart.checked_out",
  PAYMENT_COMPLETED: "payment.completed",
  REFUND_CREATED: "refund.created",
};
