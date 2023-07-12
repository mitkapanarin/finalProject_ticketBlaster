import React from "react";
import "./Cards.css";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

const Cards = ({
  eventName = "",
  image = "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/emqhuigtaseacrhvgfcr.png",
  eventDate = "",
  eventDescription = "",
  eventLocation = "",
  eventType,
  price,
  _id,
}) => {
  const isExpired = dayjs(eventDate).isBefore(dayjs());
  const navigate = useNavigate();
  return (
    <div
      onClick={() => isExpired || navigate(`/events/${_id}`)}
      // onClick={() => navigate(`/events/${_id}`)}
      className={`card-parent ${isExpired && "fade"}`}
    >
      {/* Left section */}
      <img src={image} alt="" className="card__left" />
      {/* Right section */}
      <div className="card__right">
        {/* Top section */}
        <div className="card__right--text">
          <h3 className="title">{eventName}</h3>
          <h6 className="card-date">
            {" "}
            {dayjs(eventDate).format("DD MMM, YYYY")}
          </h6>
          <p>{eventDescription}</p>
        </div>
        {/* Bottom section */}
        <div className="card-bottom_section">
          <h6 className="location">{eventLocation}</h6>
          <button className="black-button">Get ticket</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
