import React, { useState } from "react";
import "./DetailsCard.css";
import dayjs from "dayjs";
import { addToCart } from "../../store/Slices/basket";
import { useDispatch, useSelector } from "react-redux";

const DetailsCard = ({
  eventName,
  image = "https://dev-to-uploads.s3.amazonaws.com/uploads/articles/emqhuigtaseacrhvgfcr.png",
  eventDate,
  eventDescription,
  eventLocation,
  eventType,
  price,
  _id,
}) => {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(0);

  const customerID = useSelector((state) => state.User._id);
  console.log(customerID);

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(
      addToCart({
        quantity,
        eventName,
        image,
        eventDate,
        eventDescription,
        eventLocation,
        eventType,
        price,
        _id,
      })
    );
  };

  return (
    <div className="card-events-details">
      <div className="events-details">
        <h2>
          {eventName} Name {dayjs(eventDate).format("DD MMM, YYYY")} date,
          Location{eventLocation}
        </h2>
      </div>
      <div className="event-details-card-container">
        <img
          className="event-details-card-image"
          src={image}
          alt="World Map"
          width="200"
          height="153"
        />
        <div className="event-details-card-content">
          <h5 className="event-details-card-title">About</h5>
          <p className="event-details-description">
            {" "}
            event Description{eventDescription}
          </p>
          <form onSubmit={handleForm}>
            <p className="event-details-card-date">Tickets ${price} USD</p>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(+e.target.value)}
            />
            <button type="submit" className="event-details-card-button">
              Add to cart
            </button>
          </form>
        </div>
      </div>
      <div className="bottom-cards">
        <h2>Related Acts</h2>
        <div className="related-events-card-container">
          <img
            className="related-events-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="related-events-card-content">
            <h5 className="related-events-card-title">Name of artist</h5>
            <p className="related-events-card-date">
              {" "}
              {dayjs(eventDate).format("DD MMM, YYYY")}
            </p>
            <p className="related-events-card-location">Skopje, Macedonia</p>
            <button className="related-events-card-button">Get Ticket</button>
          </div>
        </div>
        <div className="related-events-card-container">
          <img
            className="related-events-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="related-events-card-content">
            <h5 className="related-events-card-title">Name of artist</h5>
            <p className="related-events-card-date">
              {" "}
              {dayjs(eventDate).format("DD MMM, YYYY")}
            </p>
            <p className="related-events-card-location">Skopje, Macedonia</p>
            <button className="related-events-card-button">Get Ticket</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsCard;
