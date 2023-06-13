import React from "react";
import "./Cards.css";

const Cards = ({
  title = "",
  image = "",
  date = "",
  description = "",
  location = { city: "", country: "" },
}) => {
  return (
    <div className="card-parent">
      {/* Left section */}
      <img src={image} alt="" className="card__left"/>
      {/* Right section */}
      <div className="card__right">
        {/* Top section */}
        <div className="card__right--text">
          <h3 className="title">{title}</h3>
          <h6 className="card-date">{date}</h6>
          <p>{description}</p>
        </div>
        {/* Bottom section */}
        <div className="card-bottom_section">
          <h6 className="location">
            {location.city}, {location.country}
          </h6>
          <button className="black-button">Get ticket</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
