import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useGetAllEventsQuery } from "../../store/API/eventApi"
import InputField from "../Form/InputField";
import AdminTab from "../AdminTab/AdminTab";
import "./Events.css";
import RelatedActs from "../RelatedActs/RelatedActs";
import Loader from "../Loader/Loader";
import UploadEventImage from "../Upload/UploadEventImage";

const Events = ({ handleSubmit, handleInput, eventData }) => {
  const dispatch = useDispatch();
  const { data, isLoading, isFetching, isError } = useGetAllEventsQuery();
  const sortDate = (a, b) => {
    return new Date(a.eventDate) - new Date(b.eventDate);
  };

  const concerts = data?.data
    ?.filter((item) => item?.eventType === "concert")
    .slice()
    .sort((a, b) => sortDate(a, b));

  const comedies = data?.data
    ?.filter((item) => item?.eventType === "comedy")
    .slice()
    .sort((a, b) => sortDate(a, b));

  if (isLoading || isFetching) return <Loader />;

  if (isError) {
    return <h1>Something went wrong</h1>;
  }

  // if (!eventData || !eventData.eventType) {
  //   return <h1>No event data available.</h1>;
  // }

  return (
    <div className="card-events-details">
      <div className="navbar-events-details">
        <h2>Events</h2>
        <AdminTab />
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
            <div className="events-event-photo">
              <UploadEventImage/>
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

      {/* Display related events based on the event type */}
      {/* {eventData.eventType === "concert" && (
        <>
          {concerts?.map((item) => (
            <RelatedActs key={item._id} {...item} />
          ))}
        </>
      )}
      {eventData.eventType === "comedy" && (
        <>
          {comedies?.map((item) => (
            <RelatedActs key={item._id} {...item} />
          ))}
        </>
      )} */}
    </div>
  );
};

{/* <div className="bottom-cards">
        <div className="botom-event-card-container">
          <img
            className="botom-event-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg"
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
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Classical_spectacular10.jpg/1280px-Classical_spectacular10.jpg"
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
      </div> */}

export default Events;
