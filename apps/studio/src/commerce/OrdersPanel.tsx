import React from "react";

export const OrdersPanel: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5>Orders History Logs</h5>
      <ul style={{ paddingLeft: "1.2rem" }}>
        <li>Order #1001 (Completed) - $49.00</li>
        <li>Order #1002 (Processing) - $12.00</li>
      </ul>
    </div>
  );
};
export default OrdersPanel;
