import React, { useState } from "react";
import InputField from "../../Components/Form/InputField";
import { useNavigate } from "react-router-dom";
import "../Checkout/Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { usePurchaseTicketMutation } from "../../store";
import { toast } from "react-toastify";
import { resetCart } from "../../store";
import AllItemsCart from "../../Components/AllItemsCart/AllItemsCart";

const Checkout = () => {
  const dispatch = useDispatch();
  const [purchaseTicket] = usePurchaseTicketMutation();

  const userRole = useSelector((state) => state.User.role);
  console.log("role", userRole);

  const customerID = useSelector((state) => state?.User?._id);
  console.log(customerID);
  const basket = useSelector((state) => state.Basket.basketItems);
  const modifyBasket = basket.map((item) => {
    return {
      eventID: item._id,
      quantity: item.quantity,
      customerID,
      status: "completed",
    };
  });
  console.log(modifyBasket);
  const [data, setData] = useState({
    name: "",
    cardNo: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInput = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSales = async () => {
    // Check if any of the fields are empty
    if (!data.name || !data.cardNo || !data.expires || !data.pin) {
      toast.error("Please fill in all the fields before proceeding.");
      return;
    }

    try {
      await toast
        .promise(purchaseTicket(modifyBasket).unwrap(), {
          pending: "Processing...",
          success: "Purchase successful!",
          error: "Something went wrong.",
        })
        .then(() => {
          dispatch(resetCart());
          // Check the user's role and navigate accordingly
          if (userRole === "user") {
            navigate("/user-purchase-ticket");
          } else if (userRole === "admin") {
            navigate("/admin-purchase-ticket");
          } else {
            navigate("/");
          }
        });
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="checkout-card-h">Checkout</h2>
      <div className="divider">
        <AllItemsCart />
        <div className="">
          <div className="checkout-right-section">
            <InputField
              type="text"
              name="name"
              value={data.username}
              onChange={handleInput}
              label="Full Name"
              placeholder="Enter Your name here..."
              required={true}
              className="checkout-input"
            />
            <InputField
              type="text"
              name="cardNo"
              value={data.cardNo}
              onChange={handleInput}
              label="Card No."
              placeholder="234343434646"
              required={true}
              className="checkout-input"
            />
            <InputField
              type="date"
              name="expires"
              value={data.date}
              onChange={handleInput}
              label="Expires"
              placeholder="Enter your expireing date"
              required={true}
              className="checkout-input"
            />
            <InputField
              type="pin"
              name="pin"
              value={data.pin}
              onChange={handleInput}
              label="PIN"
              placeholder="Enter your pin"
              required={true}
              className="checkout-input"
            />
          </div>
        </div>
      </div>
      <div className="checkout-bottom-section">
        <button onClick={() => navigate(-1)} className="back-bottom-btn">
          Back
        </button>
        <button onClick={handleSales} className="checkout-bottom-btn">
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Checkout;
