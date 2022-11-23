import React from "react";
import "./Item.css";

function Item({ name, qty,price }) {
  return (
    <div className="order-container">
      <div className="order-row">
        <div className="order row">
          <h1>{name}</h1>
        </div>
        <div className="order-data">
          <p className="order-price">₹{Number(price)*Number(qty).toLocaleString()}</p>
          <p className="order-qty">{qty.toLocaleString()}Pcs.</p>
        </div>
      </div>
    </div>
  );
}

export default Item;
