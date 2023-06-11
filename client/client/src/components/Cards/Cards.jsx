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
      {/* // Left section */}
      <img src={image} alt="" />
      {/* // right section */}
      <div className="">
        {/* // top section */}
        <div className="">
          <h3>{title}</h3>
          <h6 className="card-date">{date}</h6>
          <p>{description}</p>
        </div>
        {/* // bottom section */}
        <div className="card-bottom_section">
          <h6>
            {location.city}, {location.country}
          </h6>
          <button>Get ticket</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
