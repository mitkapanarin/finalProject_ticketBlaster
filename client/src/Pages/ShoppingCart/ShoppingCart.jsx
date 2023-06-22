import React, {useState} from "react";
import InputField from '../../components/Form/InputField';
import { useNavigate } from 'react-router-dom';
import "../ShoppingCart/ShoppingCart.css";


const ShoppingCart = () => {
  const [data, setData] = useState({
    name: "",
    cardNo: "",
    password: ""
});

const navigate = useNavigate()

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

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  return (
    <div>
      <h2 className="ShoppingCart-card-h">ShoppingCart</h2>
      <div className="ShoppingCart-card-container">
        <div className="left-ShoppingCart-card-container">
          <img
            className="left-ShoppingCart-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="left-ShoppingCart-card-content">
            <h5 className="left-ShoppingCart-card-title">Name of artist</h5>
            <p className="left-ShoppingCart-card-date">June 9th 2023</p>
            <p className="left-ShoppingCart-card-location">Skopje, Macedonia</p>
          </div>
        </div>
        <div className="ShoppingCart-price">
          <p className="ShoppingCart-total-price">$120.00</p>
          <p className="ShoppingCart-total-tickets">2x60.00USD</p>
          <button className="left-ShoppingCart-card-button">Remove</button>
        </div>
      </div>
      <hr className="hr-sc" />
      <div className="ShoppingCart-right-section" >
        <button className="ShoppingCart-back-btn">Back</button>
        <button className="ShoppingCart-checkout-btn">Checkout</button>
      </div>
    </div>
  );
};

export default ShoppingCart;


