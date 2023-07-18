import React, { useState } from "react";
import InputField from "../../components/Form/InputField";
import { useNavigate } from "react-router-dom";
import "../Checkout/Checkout.css";
import { useSelector, useDispatch } from "react-redux";
import { usePurchaseTicketMutation } from "../../store";
import { toast } from "react-toastify";
import { resetCart } from "../../store";
import dayjs from "dayjs";

const Checkout = ({
  eventName = "",
  image = "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/emqhuigtaseacrhvgfcr.png",
  eventDate = "",
  eventLocation = "",
  quantity,
  price,
  _id,
}) => {
  const dispatch = useDispatch();
  const [purchaseTicket] = usePurchaseTicketMutation();

  const customerID = useSelector((state) => state?.User?._id);
  console.log(customerID);
  const basket = useSelector((state) => state.Basket.basketItems);
  const modifyBasket = basket.map((item) => ({
    eventID: item._id,
    quantity: item.quantity,
    customerID,
    status: "completed",
  }));
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
    try {
      await purchaseTicket(modifyBasket);
      toast.success("Payed successfully 👌");
      dispatch(resetCart());
      navigate("/purchase");
    } catch (err) {
      toast.error("Paying wasnt success, please try again");
      console.log(err);
    }
  };

  const totalBill = quantity * price;

  return (
    <div>
      <h2 className="checkout-card-h">Checkout</h2>
      <div className="divider">
        <div className="">
          <div className="checkout-card-container">
            <div className="left-checkout-card-container">
              <img
                className="left-checkout-card-image"
                src={image}
                alt="World Map"
                width="200"
                height="153"
              />
              <div className="left-checkout-card-content">
                <h5 className="left-checkout-card-title">{eventName}</h5>
                <p className="left-checkout-card-date">
                  {dayjs(eventDate).format("DD MMM, YYYY")}
                </p>
                <p className="left-checkout-card-location">{eventLocation}</p>
              </div>
            </div>
            <div className="checkout-price">
              <p className="checkout-total-price">${price}</p>
              <p className="checkout-total-tickets">{quantity} x ${price}</p>
            </div>
          </div>
          <hr className="hr" />
          <div className="total">
            <p>Total:</p>
            <p>${totalBill}</p>
          </div>
        </div>
        <div className="">
          <div className="checkout-right-section">
            <InputField
              type="text"
              name="name"
              value={data.name}
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
              value={data.expires}
              onChange={handleInput}
              label="Expires"
              placeholder="Enter your expiration date"
              required={true}
              className="checkout-input"
            />
            <InputField
              type="pin"
              name="pin"
              value={data.pin}
              onChange={handleInput}
              label="PIN"
              placeholder="Enter your PIN"
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
