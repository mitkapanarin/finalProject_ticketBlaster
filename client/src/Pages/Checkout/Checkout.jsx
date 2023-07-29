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
  console.log("role",userRole)

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
    const x = await purchaseTicket(modifyBasket).then(() => {
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
        <AllItemsCart/>
        {/* <div className="">
          <div className="checkout-card-container">
            <div className="left-checkout-card-container">
              <img
                className="left-checkout-card-image"
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
                alt="World Map"
                width="200"
                height="153"
              />
              <div className="left-checkout-card-content">
                <h5 className="left-checkout-card-title">Name of artist</h5>
                <p className="left-checkout-card-date">June 9th 2023</p>
                <p className="left-checkout-card-location">Skopje, Macedonia</p>
              </div>
            </div>
            <div className="checkout-price">
              <p className="checkout-total-price">$120.00</p>
              <p className="checkout-total-tickets">2x60.00USD</p>
            </div>
          </div>
          <hr className="hr" />
          <div className="total">
            <p>Total:</p>
            <p>$120</p>
          </div>
        </div> */}
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
