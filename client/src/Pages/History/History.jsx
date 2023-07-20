import React from "react";
import "./History.css";
import dayjs from "dayjs";
import PrintModal from "../../Components/PrintModal/PrintModal";

const History = ({
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
            {" "}
            {dayjs(eventDate).format("DD MMM, YYYY")}
          </h6>
          <p>{eventDescription}</p>
        </div>
        {/* Bottom section */}
        <div className="card-bottom_section">
          <h6 className="location">{eventLocation}</h6>
          <PrintModal />
        </div>
      </div>
    </div>
  );
};

export default History;
