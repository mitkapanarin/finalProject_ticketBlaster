import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const AllItemsCart = () => {

  const basketItems = useSelector((state) => state?.Basket?.basketItems);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    basketItems.forEach((item) => { //Iterate through the basketItems and add each item's price multiplied by its quantity to the total price variable.
      totalPrice += item.price * item.quantity;
    });
    return totalPrice;
  };
  

  return (
    <div>
      {basketItems?.map((item) => (
        <div key={item._id} className="ShoppingCart-card-container">
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
          </div>
        </div>
      ))}
      <hr className="hr-sc" />

      <div className="total-price-container">
        <h3>Total Price:</h3>
        <p>${calculateTotalPrice()}</p>
      </div>

    </div>
  );
};

export default AllItemsCart;
