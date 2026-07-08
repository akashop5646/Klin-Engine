import React from "react";

export const ProductsPanel: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5>Products Catalog</h5>
      <ul style={{ paddingLeft: "1.2rem" }}>
        <li>Premium Plan Subscription ($49.00)</li>
        <li>Custom Domain Binding Package ($12.00)</li>
      </ul>
    </div>
  );
};
export default ProductsPanel;
