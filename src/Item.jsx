import React from "react";
import "./Item.css";

function Item({ name, qty,price }) {
  return (
    <div className="order-container">
      <div className="order-row">
        <div className="order row">
          <h1>{name}</h1>
        </div>
        
      </div>
    </div>
  );
}

export default Item;
