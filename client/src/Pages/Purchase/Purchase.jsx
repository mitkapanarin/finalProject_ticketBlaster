import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';
import "../Purchase/Purchase.css";


const Purchase = () => {
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
      <h2 className="Purchase-card-h">Thank you for your purchase!</h2>
      <div className="Purchase-card-container">
        <div className="left-Purchase-card-container">
          <img
            className="left-Purchase-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="left-Purchase-card-content">
            <h5 className="left-Purchase-card-title">Name of artist</h5>
            <p className="left-Purchase-card-date">June 9th 2023</p>
            <p className="left-Purchase-card-location">Skopje, Macedonia</p>
          </div>
        </div>
        <div className="Purchase-price">
          <p className="Purchase-total-price">$120.00</p>
          <p className="Purchase-total-tickets">2x60.00USD</p>
          <button className="left-Purchase-card-button">Print</button>
        </div>
      </div>
      <hr className="hr-sc" />
    </div>
  );
};

export default Purchase;


