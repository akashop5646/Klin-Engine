import React from "react";

export const CollectionsPanel: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5>CMS Collections Database</h5>
      <ul style={{ paddingLeft: "1.2rem", margin: "0.5rem 0" }}>
        <li>Blog Posts Collection</li>
        <li>Team Profiles Collection</li>
        <li>Testimonials Collection</li>
      </ul>
    </div>
  );
};
export default CollectionsPanel;
