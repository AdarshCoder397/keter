import React from "react";
import Item from "./Item";
import "./Menu.css";

function Menu({}) {
  const order = [
    { name: "Samosa", qty: "50", price: "7" },
    { name: "Idli", qty: "67", price: "7" },
    { name: "Idli", qty: "67", price: "7" },
    { name: "Idli", qty: "67", price: "7" },
    { name: "Idli", qty: "67", price: "7" },
    { name: "Idli", qty: "67", price: "7" },
    { name: "Idli", qty: "67", price: "7" },
    { name: "Idli", qty: "67", price: "7" },
  ];
  return (
    <div className="page">
      <h2>Menu</h2>
        {order.map((orders) => {
          return (
            <Item name={orders.name} qty={orders.qty} price={orders.price} />
          );
        })}
    </div>
  );
}

export default Menu;
