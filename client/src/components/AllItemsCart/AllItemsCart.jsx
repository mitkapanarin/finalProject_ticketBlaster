import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

const AllItemsCart = () => {
  const basketItems = useSelector((state) => state?.Basket?.basketItems);

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    basketItems.forEach((item) => {
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
              src={item.image} // Use the image property from the item object
              alt={item.eventName}
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
      <div className="total-price-container">
        <hr />
        <h3>Total Price:</h3>
        <p>${calculateTotalPrice()}</p>
      </div>
    </div>
  );
};

export default AllItemsCart;
