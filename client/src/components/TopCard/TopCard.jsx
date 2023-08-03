import React from "react";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import "./TopCard.css";

const TopCard = ({ 
eventName = "",
image = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg",
eventDate = "",
eventLocation = "",
_id
}) => {
  const navigate = useNavigate();
  const handleGetTicketClick = () => {
    navigate(`/events/${_id}`);
  };

  return (
    <div className="top-card-container">
      <img src={image} alt={eventName} className="top-card-background" />
      <div className="top-card-content">
        <div className="top-card-left">
          <h3 className="top-card-title">{eventName}</h3>
          <div className="top-card-details">
            <h6 className="top-card-date">
            {dayjs(eventDate).format("DD MMM, YYYY")}
            </h6>
            <p className="top-card-location">
              {eventLocation}
            </p>
          </div>
        </div>
        <div className="top-card-right">
          <button onClick={handleGetTicketClick} className="top-card-button">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopCard;
