import React from "react";

export const CustomersPanel: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5>Customers Profiles Directory</h5>
      <ul style={{ paddingLeft: "1.2rem" }}>
        <li>John Doe (john@acme.com)</li>
        <li>Jane Smith (jane@bistro.org)</li>
      </ul>
    </div>
  );
};
export default CustomersPanel;
