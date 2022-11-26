import { Button } from "@mui/material";
import React from "react";
import "./Item.css";
import DeleteIcon from "@mui/icons-material/Delete";

function Item({ name, deleteItem }) {
  return (
    <div className="order-container">
      <div className="order-row">
        <div className="order row">
          <h1>{name}</h1>
        </div>
        <div className="order-data">
          <div className="order-price">
            <Button onClick={() => deleteItem(name)} className="red">
              <DeleteIcon className="red"/>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Item;
