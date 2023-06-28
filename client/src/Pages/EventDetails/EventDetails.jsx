import React from "react";
import { Link } from "react-router-dom";
import "./EventDetails.css";

const EventDetails = ({ eventName, eventDate, eventLocation, eventDescription }) => {
  return (
    <div className="card-events-details">
      <div className="events-details">
        <h2>{eventName} Name {eventDate} date, Location{eventLocation}</h2>
      </div>
      <div className="event-details-card-container">
        <img
          className="event-details-card-image"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
          alt="World Map"
          width="200"
          height="153"
        />
        <div className="event-details-card-content">
          <h5 className="event-details-card-title">About</h5>
          <p className="event-details-description"> event Description{eventDescription}</p>
          <div>
            <p className="event-details-card-date">Tickets $15 USD</p>
            <input type="number" defaultValue={0} />
            <button className="event-details-card-button">Add to cart</button>
          </div>
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
            <p className="related-events-card-date">June 9th 2023</p>
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
            <p className="related-events-card-date">June 9th 2023</p>
            <p className="related-events-card-location">Skopje, Macedonia</p>
            <button className="related-events-card-button">Get Ticket</button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default EventDetails;
