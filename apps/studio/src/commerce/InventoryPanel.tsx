import React from "react";

export const InventoryPanel: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5>Stocks & Reservations</h5>
      <p style={{ margin: 0 }}>Active subscriptions slots allocated: 42 / 100</p>
    </div>
  );
};
export default InventoryPanel;
