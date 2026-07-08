import React from "react";

export const RelationsPanel: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem" }}>
      <h5>CMS Relations Grid</h5>
      <p style={{ margin: 0 }}>Linked: Blog.author ➜ Members.userId</p>
    </div>
  );
};
export default RelationsPanel;
