import React, { useState } from "react";
import "./TicketHistory.css";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/Slices/userSlice";


const TicketHistory = () => {
  const dispatch = useDispatch()


  return (
    <div className="card-ticket-history-details">
      <div className="navbar-ticket-history-details">
        <h2>User Details</h2>
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
    </div>
  );
};

export default TicketHistory;
