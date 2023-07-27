// Cards.js

import React, { useState } from "react";
import "./Cards.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Cards = ({
  eventName = "",
  image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg",
  eventDate = "",
  eventDescription = "",
  eventLocation = "",
  eventType,
  price,
  _id,
}) => {
  const isExpired = dayjs(eventDate).isBefore(dayjs());
  const [showFullDescription, setShowFullDescription] = useState(false);
  const navigate = useNavigate();

  const handleGetTicketClick = () => {
    navigate(`/events/${_id}`);
  };

  return (
    <div className={`card-parent ${isExpired && "fade"}`}>
      {/* Left section */}
      <img src={image} alt="" className="card__left" />
      {/* Right section */}
      <div className="card__right">
        {/* Top section */}
        <div className="card__right--text">
          <h3 className="title">{eventName}</h3>
          <h6 className="card-date">
            {dayjs(eventDate).format("DD MMM, YYYY")}
          </h6>
          {showFullDescription ? (
            <p>{eventDescription}</p>
          ) : (
            <p>{eventDescription.slice(0, 100)}...</p>
          )}
        </div>
        {/* Bottom section */}
        <div className="card-bottom_section">
          <h6 className="location">{eventLocation}</h6>
          <button onClick={handleGetTicketClick} className="black-button">
            Get Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
