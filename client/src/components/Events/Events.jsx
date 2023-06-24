import React, { useState } from "react";
import { useDispatch } from "react-redux";
import InputField from "../Form/InputField";
import "./Events.css";

const Events = ({ handleSubmit, handleInput, data }) => {

  const dispatch = useDispatch()

  return (
    <div className="card-events-details">
      <div className="navbar-events-details">
        <h2>Events</h2>
        <nav>
          <ul>
            <li><a href="/events">Events</a></li>
            <li><a href="/all-users">Users</a></li>
            <li><a href="/ticket-history">Ticket History</a></li>
            <li><a href="/admin-details">User Details</a></li>
            <li><a onClick={() => dispatch(logout())} >Logout</a></li>
          </ul>
        </nav>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="input-row">
          <InputField
            className="inputField"
            type="text"
            name="eventName"
            value={data.eventName}
            onChange={handleInput}
            placeholder="Event Name"
            required={true}
            label="Event Name"
          />

          <div>
            <label htmlFor="eventType">Category:</label>
            <select
              name="eventType"
              value={data.eventType}
              onChange={handleInput}
              required={true}
            >
              <option value="">Select a category</option>
              <option value="concert">Musical Concert</option>
              <option value="comedy">Stand-Up Comedy</option>
            </select>
          </div>
          <InputField
            className="inputField"
            type="date"
            name="eventDate"
            value={data.eventDate}
            onChange={handleInput}
            placeholder="Event Date"
            required={true}
            label="Event Date"
          />
        </div>
        <div className="events-content">
          <div className="events-left-section">
            <div className="events-upload-button">
              <button className="events-black-button">Upload Event Art</button>
            </div>
            <div className="events-event-photo">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Children_Playing_Violin_Suzuki_Institute_2011.JPG/1280px-Children_Playing_Violin_Suzuki_Institute_2011.JPG"
                alt="Event Art"
                className="event-image"
              />
            </div>
          </div>
          <div className="events-right-section">
            <div className="events-event-details">
              <label htmlFor="event-details">Event Details:</label>
              <textarea
                name="eventDescription"
                value={data.eventDescription}
                onChange={handleInput}
                rows="5"
              ></textarea>
            </div>
            <div className="events-price-input">
              <InputField
                className="inputField"
                type="number"
                name="price"
                value={data.price}
                onChange={handleInput}
                placeholder="Event price"
                required={true}
                label="Event price"
              />
            </div>
            <InputField
              className="inputField"
              type="text"
              name="eventLocation"
              value={data.eventLocation}
              onChange={handleInput}
              placeholder="Event Location"
              required={true}
              label="Event Location"
            />
          </div>
        </div>
        <div className="related-events">
          {/* <label htmlFor="category" className="related-events-label">
            Related Events
          </label> */}
          <div className="related-events-input">
            {/* <select
              name="relates-events"
              value={data.eventType}
              onChange={handleInput}
              required={true}
            >
              <option value="">Select a category</option>
              <option value="Concert1">Concert1</option>
              <option value="Concert2">Concert2</option>
            </select> */}
            <button type="submit" className="related-events-btn">
              Add
            </button>
          </div>
        </div>
      </form>

      {/* keep it in a separate place */}

      <div className="bottom-cards">
        <div className="botom-event-card-container">
          <img
            className="botom-event-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="botom-event-card-content">
            <h5 className="botom-event-card-title">Name of artist</h5>
            <p className="botom-event-card-date">June 9th 2023</p>
            <p className="botom-event-card-location">Skopje, Macedonia</p>
            <button className="botom-event-card-button">Remove</button>
          </div>
        </div>
        <div className="botom-event-card-container">
          <img
            className="botom-event-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="botom-event-card-content">
            <h5 className="botom-event-card-title">Name of artist</h5>
            <p className="botom-event-card-date">June 9th 2023</p>
            <p className="botom-event-card-location">Skopje, Macedonia</p>
            <button className="botom-event-card-button">Remove</button>
          </div>
        </div>
        <button className="botom-right-btn">Save</button>
      </div>
    </div>
  );
};

export default Events;