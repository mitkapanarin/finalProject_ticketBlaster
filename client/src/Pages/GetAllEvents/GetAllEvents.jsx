import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../store/Slices/userSlice";

import "./GetAllEvents.css";

const GetAllEvents = () => {

  const dispatch = useDispatch()

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
              <Link to="/admin-details">User Details</Link>
            </li>
            <li>
              <a onClick={() => dispatch(logout())}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
      <div className="botom-all-events-card-container">
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
      </div>
    </div>
  );
};

export default GetAllEvents;