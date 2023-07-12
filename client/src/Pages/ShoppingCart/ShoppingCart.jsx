import React from "react";
import { useNavigate } from "react-router-dom";
import "../ShoppingCart/ShoppingCart.css";
import { useSelector, useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { removeOneItemFromCart } from "../../store";

const ShoppingCart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const basketItems = useSelector((state) => state?.Basket?.basketItems);

  const removeItem = (id) => dispatch(removeOneItemFromCart(id));

  return (
    <div>
      <h2 className="ShoppingCart-card-h">ShoppingCart</h2>
      {basketItems?.map((item) => (
        <div key={nanoid()} className="ShoppingCart-card-container">
          <div className="left-ShoppingCart-card-container">
            <img
              className="left-ShoppingCart-card-image"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
              alt="World Map"
              width="200"
              height="153"
            />
            <div className="left-ShoppingCart-card-content">
              <h5 className="left-ShoppingCart-card-title">
                {item?.eventName}
              </h5>
              <p className="left-ShoppingCart-card-date">
                {dayjs(item?.eventDate).format("DD MMM, YYYY")}
              </p>
              <p className="left-ShoppingCart-card-location">
                {item?.eventLocation}
              </p>
            </div>
          </div>
          <div className="ShoppingCart-price">
            <p className="ShoppingCart-total-price">
              ${item.price * item?.quantity}
            </p>
            <p className="ShoppingCart-total-tickets">
              {item?.quantity} X ${item.price}
            </p>
            <button
              onClick={() => removeItem(item?._id)}
              className="left-ShoppingCart-card-button"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <hr className="hr-sc" />
      <div className="ShoppingCart-right-section">
        <button className="ShoppingCart-back-btn">Back</button>
        <button
          onClick={() => navigate("/checkout")}
          className="ShoppingCart-checkout-btn"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default ShoppingCart;
