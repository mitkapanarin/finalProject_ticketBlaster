import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/Slices/userSlice";
import AllEventsCard from "../../components/AllEventsCard/AllEventsCard";
import {useGetAllEventsQuery} from "../../store/API/eventApi"
import "./GetAllEvents.css";

const GetAllEvents = () => {

  const store = useSelector(x=>x)
  console.log(store)
  const dispatch = useDispatch()
  const {data} = useGetAllEventsQuery()
  console.log(data)
  return (
    <div className="card-all-events-details">
      <div className="navbar-all-events-details">
        <div className="h-b">
          <h2>Events</h2>
          <button className="all-events-btn" >Create Event</button>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/events">Events</Link>
            </li>
            <li>
              <Link to="/all-users">Users</Link>
            </li>
            <li>
              <Link to="/ticket-history">Ticket History</Link>
            </li>
            <li>
              <Link to="/update-user-details">User Details</Link>
            </li>
            <li>
              <a onClick={() => dispatch(logout())}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
      {Array.isArray(data) &&
        data.map((item) => <AllEventsCard _id={item._id} image={image} eventName={eventName} eventDate={eventDate} eventLocation={eventLocation} button={button} />)}
      {/* <div className="botom-all-events-card-container">
        <div className="botom-all-events-card-content">
          <img
            className="botom-all-events-card-image"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/World_Map_%28political%29.svg/1024px-World_Map_%28political%29.svg.png"
            alt="World Map"
            width="200"
            height="153"
          />
          <div className="parent">
            <h5 className="botom-all-events-card-title">Name of artist</h5>
            <div className="p-div">
              <p className="botom-all-events-card-date">June 9th 2023</p>
              <p className="botom-all-events-card-location">Skopje, Macedonia</p>
            </div>
          </div>
        </div>
        <button className="botom-all-events-card-button">Delete Event</button>
      </div> */}
    </div>
  );
};

export default GetAllEvents;