import React, {useState} from "react";
import InputField from '../../components/Form/InputField';
import "../Checkout/Checkout.css";


const Checkout = () => {
  const [data, setData] = useState({
    name: "",
    cardNo: "",
    password: ""
});

const handleInput = (e) => {
    setData({
        ...data,
        [e.target.name]: e.target.value,
    });
};

const handleSubmit = async (e) => {
    e.preventDefault();
};

const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div>
      <h2 className="checkout-card-h">Checkout</h2>
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
            <button className="left-checkout-card-button">Remove</button>
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
  );
};

export default Checkout;
