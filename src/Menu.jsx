import React, { useEffect, useState } from "react";
import Item from "./Item";
import "./Menu.css";

function Menu({}) {
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const items = [
    "Panner",
    "Nan Roti",
    "Manchurian",
    "Chicken",
    "Pullav",
    "Dal",
    "Poori",
    "Aloo Gobi",
    "Kheer",
    "Aloo Chutney",
    "Tomato Chutney",
    "Samosa",
  ];
  const create_list = (e) => {
    e.preventDefault();
    if (name !== "" && !order.includes(name)) {
      order.push(name);
      setOrder([...order]);
      console.log(order);
      setName("");
    }
  };
  return (
    <div className="page">
      <h2>Add Item to Menu</h2>
      <form className="row g-3 mt-4">
        <div className="col-auto inpName">
          <select
            className="form-select"
            aria-label="Default select example"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          >
            <option value="ign">Select a dish</option>
            {items.map((item) => {
              return <option value={item}>{item}</option>;
            })}
          </select>
        </div>
        <div className="col-auto">
          <button
            onClick={create_list}
            className={`btn btn-primary mb-3 btn-crt`}
          >
            Add item
          </button>
        </div>
      </form>

      {order.map((orders) => {
        return <Item name={orders} />;
      })}
    </div>
  );
}

export default Menu;
