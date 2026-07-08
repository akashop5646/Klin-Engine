import React from "react";

export const NavigatorTree: React.FC = () => {
  return (
    <div style={{ fontSize: "0.85rem", color: "#4a5568" }}>
      <h5 style={{ margin: "0 0 0.5rem 0" }}>Navigator Tree</h5>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li>Body</li>
        <li style={{ paddingLeft: "1rem" }}>└─ HeroSection</li>
        <li style={{ paddingLeft: "2rem" }}>└─ Container</li>
        <li style={{ paddingLeft: "3rem" }}>└─ Grid</li>
        <li style={{ paddingLeft: "4rem" }}>└─ CardItem</li>
      </ul>
    </div>
  );
};
export default NavigatorTree;
