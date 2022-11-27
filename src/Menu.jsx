import React, { useState } from "react";
import Item from "./Item";
import "./Menu.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";
import Outro from "./Outro";

function Menu({ usr_name, address, date, number }) {
  const [outroView, setOutroView] = useState(false);
  const [order, setOrder] = useState([]);
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [people, setPeople] = useState("");
  const addData = async (e) => {
    e.preventDefault();
    if (people !== "") {
      setOutroView(true);
      try {
        const docRef = await addDoc(collection(db, "orders"), {
          name: usr_name,
          address: address,
          date: date,
          number: number,
          order: order,
          people: people,
        });
      } catch (e) {
        console.error("Error adding document: ", e);
        setOutroView(false);
        alert("Error!Coudn't add your data to the database!");
      }
    }else{
      alert("Please select no. of people!")
    }
  };
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
  const People = [
    "5",
    "10",
    "25",
    "50",
    "75",
    "100",
    "125",
    "150",
    "175",
    "200",
  ];
  const create_list = (e) => {
    e.preventDefault();
    if (name !== "" && !order.includes(name)) {
      order.push(name);
      setOrder([...order]);
      console.log(order);
      setName("");
    }
    if (order.length <= 1) {
      setVisible(true);
    }
  };
  const deleteItem = (name) => {
    const index = order.indexOf(name);
    if (index !== -1) {
      order.splice(index, 1);
      setOrder([...order]);
    }
    if (order.length < 1) {
      setVisible(false);
    }
    // console.log(name)
  };
  if (!outroView) {
    return (
      <div className="Menu">
        <h2>Add Item to Menu</h2>
        <form className="row g-3 inpName">
          <div className="col-auto ">
            <select
              className="form-select"
              aria-label="Default select example"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            >
              <option>Select a dish</option>
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
          <div className="col-auto ">
            <select
              className="form-select"
              aria-label="Default select example"
              value={people}
              onChange={(e) => {
                setPeople(e.target.value);
              }}
            >
              <option>Number of people in event</option>
              {People.map((item) => {
                return <option value={item}>{item}</option>;
              })}
            </select>
          </div>
        </form>
        {order.map((orders) => {
          return <Item name={orders} deleteItem={deleteItem} />;
        })}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-5 mb-5">
          <button
            type="button"
            className={`btn btn-info next-btn ${visible && "visible"}`}
            onClick={addData}
          >
            Next
          </button>
        </div>
      </div>
    );
  } else {
    return <Outro />;
  }
}

export default Menu;
