import React from "react";
import "./TopCard.css";

const TopCard = ({
  title = "This is Title",
  image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Altja_j%C3%B5gi_Lahemaal.jpg/1280px-Altja_j%C3%B5gi_Lahemaal.jpg",
  date = "23.2.2024",
  location = { city: "Skopje", country: "Macedonia" },
}) => {
  return (
    <div className="top-card-container">
      <img src={image} alt="" className="top-card-background" />
      <div className="top-card-content">
        <div className="top-card-left">
          <h3 className="top-card-title">{title}</h3>
          <div className="top-card-details">
            <h6 className="top-card-date">{date}</h6>
            <p className="top-card-location">
              {location.city}, {location.country}
            </p>
          </div>
        </div>
        <div className="top-card-right">
          <button className="top-card-button">Get Tickets</button>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
